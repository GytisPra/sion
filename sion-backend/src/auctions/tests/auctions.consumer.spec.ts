import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BullModule, getQueueToken } from '@nestjs/bull';
import { Job } from 'bullmq';
import Bull from 'bull';
import { plainToClass } from 'class-transformer';

import { Auction } from '../auction.entity';
import { AuctionsConsumer } from '../auctions.consumer';
import { plainAuction } from '../../utils/mocks/auctions/plainAuction';
import { AuctionsService } from '../auctions.service';
import { Bid } from '../../bids/bid.entity';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/users.service';
import { plainUser } from '../../utils/mocks/users/plainUser';
import { plainExpectedBid } from '../../utils/mocks/bids/plainBid';
import { AuctionStatuses } from '../../enums/auctionStatuses.enum';
import { Notification } from '../../notifications/notification.entity';

describe('The auctions consumer', () => {
  let auctionsConsumer: AuctionsConsumer;

  const auction = plainToClass(Auction, plainAuction);
  const bid = plainToClass(Bid, plainExpectedBid);
  const user = plainToClass(User, plainUser);

  const getOneAuctionSpy = jest.fn();
  const getOneBidSpy = jest.fn();

  const mockedAuctionQueue = {
    add: jest.fn(),
    getJob: jest.fn(() => Job),
    removeJobs: jest.fn(),
  };

  const mockedAuctionsService = {
    updateAuction: jest.fn(),
  };

  const mockedUsersService = {
    checkLevel: jest.fn(),
  };

  const mockedAuctionsRepository = {
    findOne: jest.fn(),
    create: jest.fn(() => auction),
    save: jest.fn(() => auction),
    update: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      offset: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      getOne: getOneAuctionSpy,
    })),
  };

  const mockedBidsRepository = {
    findOne: jest.fn(),
    create: jest.fn(() => bid),
    save: jest.fn(() => bid),
    update: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      offset: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      getOne: getOneBidSpy,
    })),
  };

  const mockedUserRepository = {
    findOne: jest.fn(),
    create: jest.fn(() => user),
    save: jest.fn(() => user),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuctionsConsumer,
        {
          provide: getRepositoryToken(Auction),
          useValue: mockedAuctionsRepository,
        },
        {
          provide: getRepositoryToken(Bid),
          useValue: mockedBidsRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockedUserRepository,
        },
        {
          provide: getRepositoryToken(Notification),
          useValue: mockedUserRepository,
        },
        {
          provide: getQueueToken('auction-queue'),
          useValue: mockedAuctionQueue,
        },
        {
          provide: UsersService,
          useValue: mockedUsersService,
        },
        {
          provide: AuctionsService,
          useValue: mockedAuctionsService,
        },
      ],
      imports: [BullModule.registerQueue({ name: 'auction-queue' })],
    }).compile();

    auctionsConsumer = await module.get(AuctionsConsumer);
  });
  afterEach(() => jest.clearAllMocks());

  describe('When the service is called', () => {
    it('should be defined', () => {
      expect(auctionsConsumer).toBeDefined();
    });
  });

  describe('When the auction ends', () => {
    const auction = plainToClass(Auction, plainAuction);
    const bid = plainToClass(Bid, plainExpectedBid);
    const user = plainToClass(User, plainUser);

    it('the auction status should change from ACTIVE to ENDED', async () => {
      auction.soldToUser = user;
      auction.auctionStatus = AuctionStatuses.ACTIVE;
      getOneAuctionSpy.mockReturnValue(auction);
      getOneBidSpy.mockReturnValue(bid);

      const auctionJob = {} as unknown as Bull.Job<Auction>;
      auctionJob.data = auction;

      await auctionsConsumer.auctionEnd(auctionJob);

      expect(auction.auctionStatus).toEqual(AuctionStatuses.ENDED);
    });
  });

  describe('when the auction starts', () => {
    const auction = plainToClass(Auction, plainAuction);

    it('the auction status should change from PLANNED to ACTIVE', async () => {
      auction.auctionStatus = AuctionStatuses.PLANNED;
      getOneAuctionSpy.mockReturnValue(auction);

      const auctionJob = {} as unknown as Bull.Job<Auction>;
      auctionJob.data = auction;

      await auctionsConsumer.auctionStart(auctionJob);

      expect(auction.auctionStatus).toEqual(AuctionStatuses.ACTIVE);
    });
  });
});
