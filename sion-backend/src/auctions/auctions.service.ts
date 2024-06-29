import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { ConfigService } from '@nestjs/config';

import { Auction } from './auction.entity';
import { UserEntity } from '../users/serializers/users.serializer';
import { ItemsService } from '../items/items.service';
import { BidIncrementFactory } from './factories/bidIncrementFactory';

import { CreateAuctionDto } from './dto/createAuction.dto';
import { UpdateAuctionDto } from './dto/updateAuction.dto';
import {
  PaginatedAuctionsResultDto,
  PaginationDto,
} from '../utils/dto/pagination.dto';

import { AuctionStatuses, AuctionType } from '../enums';

import { AuctionNotFound } from '../utils/exceptions/auctionNotFound.exception';
import { AuctionTimeInvalid } from '../utils/exceptions/auctionTimeInvalid.exception';
import { CancellationTimeInvalid } from '../utils/exceptions/cancellationTimeInvalid.exception';
import { RenewalTimeInvalid } from '../utils/exceptions/renewalTimeInvalid.exception';
import { RenewalUnavailable } from '../utils/exceptions/renewalUnavailable.exception';
import { RenewalInvalid } from '../utils/exceptions/renewalInvalid.exception';
import { PriceTooLow } from '../utils/exceptions/priceTooLow.exception';

@Injectable()
export class AuctionsService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Auction) private auctionsRepository: Repository<Auction>,
    @InjectQueue('auction-queue') private auctionQueue: Queue,
    private bidIncrementFactory: BidIncrementFactory,
    private itemsService: ItemsService,
  ) {}

  public async createAuction(
    createAuctionBody: CreateAuctionDto,
    user: UserEntity,
  ) {
    const auctionEndInMs = createAuctionBody.endDate.getTime() - Date.now();

    // Validation if auction endDate is not in the past
    if (auctionEndInMs <= 0) {
      throw new AuctionTimeInvalid(createAuctionBody.endDate);
    }

    // BuyNowPrice has to be atleast greater by 1 than startingPrice
    if (
      createAuctionBody.buyNowPrice &&
      createAuctionBody.buyNowPrice - createAuctionBody.startingPrice < 1
    ) {
      throw new PriceTooLow(
        createAuctionBody.startingPrice,
        createAuctionBody.buyNowPrice,
      );
    }

    const auction = this.auctionsRepository.create(createAuctionBody);

    auction.price = auction.startingPrice;
    auction.createdByUser = user;

    if (createAuctionBody.auctionType.includes(AuctionType.grandAuction)) {
      // Calculating value of grand auction start by multiplying difference
      // between buy now value and starting value by 3/4 and adding it to starting value.
      auction.grandAuctionStartPrice =
        createAuctionBody.startingPrice +
        (createAuctionBody.buyNowPrice - createAuctionBody.startingPrice) *
          0.75;
    }

    const bidIncrementStrategy =
      this.bidIncrementFactory.createBidIncrementStrategy(auction.auctionType);
    auction.bidIncrement = bidIncrementStrategy.getBidIncrement(auction);

    // Item Creation.
    // Item is a separate entity that represents the object of which the auction
    // is being created. Currently, item and auction have separate concerns and item can have more
    // than one auction while single auction can have only one item.
    auction.item = await this.itemsService.createItem(
      {
        categoryGroup: createAuctionBody.categoryGroup,
        category: createAuctionBody.category,
        brand: createAuctionBody.brand,
      },
      user,
    );

    return this.auctionsRepository.save(auction);
  }

  async getUserAuctions(
    userId: string,
    paginationDto: PaginationDto,
  ): Promise<PaginatedAuctionsResultDto> {
    const skippedItems = (paginationDto.page - 1) * paginationDto.limit;

    const totalCount = await this.auctionsRepository.count({
      where: { createdByUser: userId },
    });

    const auctions = await this.auctionsRepository
      .createQueryBuilder('auction')
      .where('auction.createdByUserId = :id', { id: userId })
      .orderBy('auction.id')
      .offset(skippedItems)
      .limit(paginationDto.limit)
      .getMany();

    return {
      totalCount,
      page: paginationDto.page,
      limit: paginationDto.limit,
      data: auctions,
    };
  }

  async updateAuction(auctionId: string, updateAuctionDto: UpdateAuctionDto) {
    const auction = await this.getAuctionById(auctionId);

    if (!auction) {
      throw new AuctionNotFound(auctionId);
    }

    await this.auctionsRepository.update(auctionId, updateAuctionDto);

    return await this.auctionsRepository.findOne(auctionId);
  }

  async updateAuctionPrice(auction: Auction, price: number) {
    auction.price = price;
    return this.auctionsRepository.save(auction);
  }

  public async updateAuctionType(
    auctionId: string,
    auctionType: AuctionType[],
  ) {
    await this.auctionsRepository.update(auctionId, {
      auctionType: auctionType,
    });

    return await this.auctionsRepository.findOne(auctionId);
  }

  public async getAuctionById(id: string) {
    const auction = await this.auctionsRepository
      .createQueryBuilder('auction')
      .where({ id: id })
      // .leftJoinAndSelect('auction.createdByUser', 'createdByUser')
      // .leftJoinAndSelect('auction.item', 'item')
      // .leftJoinAndSelect('auction.bids', 'bids')
      // .leftJoinAndSelect('auction.comments', 'comments')
      // .leftJoinAndSelect('auction.soldToUser', 'soldToUser')
      .getOne();

    if (!auction) {
      throw new AuctionNotFound(id);
    }

    return auction;
  }

  public async getAuctions(
    paginationDto: PaginationDto,
  ): Promise<PaginatedAuctionsResultDto> {
    const skippedItems = (paginationDto.page - 1) * paginationDto.limit;

    const totalCount = await this.auctionsRepository.count();

    const auctions = await this.auctionsRepository
      .createQueryBuilder('auction')
      .orderBy('auction.id')
      .offset(skippedItems)
      .limit(paginationDto.limit)
      .getMany();

    return {
      totalCount,
      page: paginationDto.page,
      limit: paginationDto.limit,
      data: auctions,
    };
  }

  public async terminateAuction(auctionId: string) {
    const auction = await this.auctionsRepository
      .createQueryBuilder('auction')
      .where({ id: auctionId })
      .select(['auction.id', 'auction.endDate', 'auction.auctionStatus'])
      .getOne();

    if (!auction) {
      throw new AuctionNotFound(auctionId);
    }

    const auctionEndInMs = auction.endDate.getTime() - Date.now();

    if (auctionEndInMs <= 14400000) {
      throw new CancellationTimeInvalid(auction.endDate, new Date(Date.now()));
    }

    await this.auctionQueue.removeJobs(String(auctionId));

    auction.endDate = new Date(Date.now());
    auction.auctionStatus = AuctionStatuses.TERMINATED;
    await this.auctionsRepository.update(auction.id, auction);

    return auction;
  }

  public async cancelAuction(auctionId: string) {
    const auction = await this.auctionsRepository
      .createQueryBuilder('auction')
      .where({ id: auctionId })
      .select(['auction.id', 'auction.endDate'])
      .getOne();

    if (!auction) {
      throw new AuctionNotFound(auctionId);
    }

    const auctionEndInMs = auction.endDate.getTime() - Date.now();

    if (auctionEndInMs <= 14400000) {
      throw new CancellationTimeInvalid(auction.endDate, new Date(Date.now()));
    }

    auction.endDate = new Date(Date.now() + 14400000);
    await this.auctionQueue.removeJobs(String(auctionId));

    Promise.all([
      this.auctionQueue.add('end-auction', auction, {
        delay: auction.endDate.getTime() - Date.now(),
        jobId: auction.id,
      }),

      this.auctionsRepository.save(auction),
    ]);

    return auction;
  }

  public async extendAuction(auctionId: string) {
    const auction = await this.auctionsRepository
      .createQueryBuilder('auction')
      .where({ id: auctionId })
      .select(['auction.id', 'auction.endDate'])
      .getOne();

    if (!auction) {
      throw new AuctionNotFound(auctionId);
    }

    auction.endDate = new Date(
      auction.endDate.getTime() + this.configService.get('AUTO_EXTEND_TIME'),
    );

    await this.auctionQueue.removeJobs(auctionId);

    Promise.all([
      this.auctionQueue.add('end-auction', auction, {
        delay: auction.endDate.getTime() - Date.now(),
        jobId: auction.id,
      }),
      this.auctionsRepository.save(auction),
    ]);

    return auction;
  }

  public async renewAuction(
    auctionId: string,
    updateAuctionBody: UpdateAuctionDto,
  ) {
    const auction = await this.auctionsRepository
      .createQueryBuilder('auction')
      .where({ id: auctionId })
      .leftJoinAndSelect('auction.bids', 'bids')
      .leftJoinAndSelect('auction.soldToUser', 'soldToUser')
      .select([
        'auction.id',
        'auction.endDate',
        'auction.auctionStatus',
        'bids',
        'soldToUser',
      ])
      .getOne();

    if (!auction) {
      throw new AuctionNotFound(auctionId);
    }

    if (auction.auctionStatus === AuctionStatuses.ACTIVE) {
      throw new RenewalTimeInvalid(auction.endDate, new Date(Date.now()));
    }

    if (auction.soldToUser !== null || auction.bids.length > 0) {
      throw new RenewalUnavailable(auction.bids.length, auction.soldToUser);
    }

    if (!updateAuctionBody.endDate) {
      throw new RenewalInvalid(updateAuctionBody);
    } else if (updateAuctionBody.endDate.getTime() - Date.now() <= 0) {
      throw new AuctionTimeInvalid(updateAuctionBody.endDate);
    }

    await this.auctionQueue.removeJobs(String(auctionId));

    auction.auctionStatus = AuctionStatuses.ACTIVE;
    await this.auctionsRepository.save(auction);

    Promise.all([
      this.updateAuction(auctionId, updateAuctionBody),

      this.auctionQueue.add('end-auction', auction, {
        delay: updateAuctionBody.endDate.getTime() - Date.now(),
        jobId: auction.id,
      }),
    ]);

    return await this.getAuctionById(auctionId);
  }
}
