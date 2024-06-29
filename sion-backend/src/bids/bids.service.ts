import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateBidDto } from './dto/createBid.dto';
import {
  PaginatedBidsResultDto,
  PaginationDto,
} from '../utils/dto/pagination.dto';
import { UpdateBidDto } from './dto/updateBid.dto';
import { UserEntity } from '../users/serializers/users.serializer';
import { Bid } from './bid.entity';
import { TwoSameUserBidsInARow } from '../utils/exceptions/twoSameUserBidsInARow.exception';
import { NotEnoughKarmaPoints } from '../utils/exceptions/notEnoughKarmaPoints.exception';
import { NotEnoughTimeHasPassed } from '../utils/exceptions/notEnoughTimeHasPassed.exception';
import { AuctionType } from '../enums/auctionType.enum';
import { AuctionsService } from '../auctions/auctions.service';
import { NoEntriesFound } from '../utils/exceptions/bidNotFound.exception';
import { UsersService } from '../users/users.service';
import { OverMaximumBidLimit } from '../utils/exceptions/overMaximumBidLimit.exception';
import { Level } from '../enums/levels.enum';
import { AuctionNotAvailable } from '../utils/exceptions/auctionNotAvailable.exception';

@Injectable()
export class BidsService {
  constructor(
    @InjectRepository(Bid) private bidsRepository: Repository<Bid>,

    private readonly usersService: UsersService,
    private readonly auctionService: AuctionsService,
  ) {}

  async createBid(createBidBody: CreateBidDto, user: UserEntity) {
    const auction = await this.auctionService.getAuctionById(
      createBidBody.auctionId,
    );

    const currentTime = Date.now();

    if (currentTime < auction.startDate.getTime()) {
      throw new AuctionNotAvailable(auction.startDate);
    }
    if (currentTime > auction.endDate.getTime()) {
      throw new AuctionNotAvailable(auction.endDate);
    }

    const userLastBid = await this.bidsRepository.findOne({
      where: { auction: auction, user: user },
      order: { id: -1 },
      select: ['createdAt'],
    });

    if (userLastBid) {
      const lastBidUser = await this.bidsRepository
        .createQueryBuilder('bid')
        .orderBy('user.id', 'DESC')
        .leftJoinAndSelect('bid.user', 'user')
        .where('bid.auction = :auctionId', { auctionId: auction.id })
        .select(['bid.id', 'user'])
        .getOne();

      if (lastBidUser && lastBidUser.user.id === user.id) {
        throw new TwoSameUserBidsInARow();
      }

      const karmaMap = [
        { level: Level.Blocked, timeToPass: Number.MAX_VALUE },
        { level: Level.WatchList, timeToPass: 20 * 60000 },
        { level: Level.Zero, timeToPass: 12 * 60000 },
        { level: Level.One, timeToPass: 8 * 60000 },
        { level: Level.Two, timeToPass: 7 * 60000 },
        { level: Level.Three, timeToPass: 5 * 60000 },
        { level: Level.Veteran, timeToPass: 3 * 60000 },
        { level: Level.Elite, timeToPass: 2 * 60000 },
      ];

      const timePassed = currentTime - userLastBid.createdAt.getTime();

      const findKarmaRule = karmaMap.find(
        (rule) => user.level === rule.level && timePassed < rule.timeToPass,
      );

      if (findKarmaRule) {
        if (user.karmaPoints <= -6) {
          throw new NotEnoughKarmaPoints(user.karmaPoints);
        }
        throw new NotEnoughTimeHasPassed(findKarmaRule.timeToPass);
      }
    }

    const newBid = await this.bidsRepository.create({
      auction,
      user,
    });

    if (
      auction.auctionType.includes(AuctionType.buyNow) ||
      auction.auctionType.includes(AuctionType.grandAuction)
    ) {
      newBid.value = auction.price + auction.bidIncrement;

      if (
        auction.auctionType.includes(AuctionType.buyNow) &&
        auction.auctionType.includes(AuctionType.grandAuction) &&
        auction.grandAuctionStartPrice <= newBid.value
      ) {
        auction.auctionType.splice(
          auction.auctionType.indexOf(AuctionType.buyNow),
          1,
        );
        Promise.all([
          this.usersService.updateUserKarmaPoints(user, 1),
          this.auctionService.updateAuctionType(
            auction.id,
            auction.auctionType,
          ),
        ]);
      }
    } else {
      const milliseconds = auction.endDate.getTime() - currentTime;

      if (milliseconds >= 1 * 48 * 60 * 60 * 1000) {
        newBid.value = 1.02 * auction.price + 0.5;
      } else if (
        milliseconds < 1 * 48 * 60 * 60 * 1000 &&
        milliseconds >= 1 * 4 * 60 * 60 * 1000
      ) {
        newBid.value = 1.03 * auction.price + 0.5;
      } else if (
        milliseconds < 1 * 4 * 60 * 60 * 1000 &&
        milliseconds >= 1 * 1 * 5 * 60 * 1000
      ) {
        newBid.value = 1.038 * auction.price + 0.5;
      } else {
        newBid.value = 1.045 * auction.price + 0.5;
      }
    }

    const userFirstBid = await this.bidsRepository
      .createQueryBuilder('bid')
      .where({ auction: auction, user: user })
      .orderBy('id', 'ASC')
      .select('bid.createdAt')
      .getOne();

    if (
      (auction.auctionType.includes(AuctionType.autoExtend) &&
        auction.endDate.getTime() - Date.now() <= 300000) ||
      auction.initialEndDate !== auction.endDate
    ) {
      if (user.karmaPoints >= 10) {
        if (userFirstBid === undefined) {
          this.auctionService.extendAuction(auction.id);
        } else if (
          userFirstBid.createdAt.getTime() <= auction.initialEndDate.getTime()
        ) {
          if (currentTime - userLastBid.createdAt.getTime() >= 120000) {
            this.auctionService.extendAuction(auction.id);
          } else throw new NotEnoughTimeHasPassed(120000);
        } else if (
          userFirstBid.createdAt.getTime() >= auction.initialEndDate.getTime()
        ) {
          if (currentTime - userLastBid.createdAt.getTime() > 240000) {
            if (
              (await this.bidsRepository.count({
                where: { auction: auction, user: user },
              })) <= 3
            ) {
              this.auctionService.extendAuction(auction.id);
            } else throw new OverMaximumBidLimit(3);
          } else throw new NotEnoughTimeHasPassed(240000);
        }
      } else throw new NotEnoughKarmaPoints(user.karmaPoints);
    }

    Promise.all([
      this.usersService.updateUserKarmaPoints(user, 0.25),
      this.auctionService.updateAuctionPrice(auction, newBid.value),
      this.bidsRepository.save(newBid),
    ]);

    return newBid;
  }

  async getBidById(id: number) {
    const bid = await this.bidsRepository.findOne(id);

    if (!bid) {
      throw new NoEntriesFound(id);
    }
    return bid;
  }

  async getBids(paginationDto: PaginationDto): Promise<PaginatedBidsResultDto> {
    const skippedItems = Number((paginationDto.page - 1) * paginationDto.limit);

    const totalCount = await this.bidsRepository.count();

    const bids = await this.bidsRepository
      .createQueryBuilder('bid')
      .orderBy('bid.createdAt')
      .offset(skippedItems)
      .limit(paginationDto.limit)
      .getMany();

    return {
      totalCount,
      page: paginationDto.page,
      limit: paginationDto.limit,
      data: bids,
    };
  }

  async getUserBids(
    userId: number,
    paginationDto: PaginationDto,
  ): Promise<PaginatedBidsResultDto> {
    const skippedItems = (paginationDto.page - 1) * paginationDto.limit;

    const totalCount = await this.bidsRepository.count({
      where: { user: userId },
    });

    const bids = await this.bidsRepository
      .createQueryBuilder('bid')
      .where('user.id = :id', { id: userId })
      .leftJoinAndSelect('bid.user', 'user')
      .orderBy('bid.createdAt')
      .offset(skippedItems)
      .limit(paginationDto.limit)
      .getMany();

    return {
      totalCount,
      page: paginationDto.page,
      limit: paginationDto.limit,
      data: bids,
    };
  }

  async updateBid(id: number, updateBidBody: UpdateBidDto) {
    const bid = await this.bidsRepository.findOne(id);

    if (!bid) {
      throw new NoEntriesFound(id);
    }
    await this.bidsRepository.update(id, updateBidBody);

    return await this.bidsRepository.findOne(id);
  }
}
