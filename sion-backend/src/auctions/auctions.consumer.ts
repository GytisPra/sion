import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Job, Queue } from 'bull';
import { Repository } from 'typeorm';

import { AuctionStatuses } from '../enums/auctionStatuses.enum';
import { NotificationTypes } from '../enums/notificationTypes.enum';

import { Bid } from '../bids/bid.entity';
import { Notification } from '../notifications/notification.entity';
import { Auction } from './auction.entity';

@Processor('auction-queue')
export class AuctionsConsumer {
  constructor(
    @InjectRepository(Auction) private auctionsRepository: Repository<Auction>,
    @InjectRepository(Bid) private bidsRepository: Repository<Bid>,
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
    @InjectQueue('auction-queue') private auctionQueue: Queue,
  ) {}
  @Process('end-auction')
  async auctionEnd(job: Job<Auction>) {
    const auction = await this.auctionsRepository
      .createQueryBuilder('auction')
      .where('auction.id = :auctionId', { auctionId: job.data.id })
      .leftJoinAndSelect('auction.createdByUser', 'createdByUser')
      .select(['createdByUser'])
      .getOne();

    const { user: buyer } = await this.bidsRepository
      .createQueryBuilder('bid')
      .orderBy('user.id', 'DESC')
      .leftJoinAndSelect('bid.user', 'user')
      .where('bid.auction = :auctionId', { auctionId: job.id })
      .select(['bid.id', 'user'])
      .getOne();

    auction.auctionStatus = AuctionStatuses.ENDED;
    auction.soldToUser = buyer;

    const notification = this.notificationsRepository.create({
      user: auction.createdByUser,
      type: NotificationTypes.auctionHasEnded,
    });

    Promise.all([
      this.auctionsRepository.save(auction),
      this.notificationsRepository.save(notification),
    ]);
  }

  @Process('start-auction')
  async auctionStart(job: Job<Auction>) {
    const auction = await this.auctionsRepository
      .createQueryBuilder('auction')
      .where('auction.id = :auctionId', { auctionId: job.data.id })
      .select(['auction.id', 'auction.auctionStatus', 'auction.endDate'])
      .getOne();
    const auctionEndInMs = auction.endDate.getTime() - Date.now();
    auction.auctionStatus = AuctionStatuses.ACTIVE;

    Promise.all([
      this.auctionsRepository.save(auction),

      this.auctionQueue.add('end-auction', auction, {
        delay: auctionEndInMs,
        jobId: auction.id,
      }),
    ]);
  }
}
