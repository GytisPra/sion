import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

import { Bid } from '../bid.entity';
import { Auction } from '../../auctions/auction.entity';

import { BidsService } from '../bids.service';
import { AuctionsService } from '../../auctions/auctions.service';
import { plainToClass } from 'class-transformer';
import { UserEntity } from '../../users/serializers/users.serializer';
import { CreateBidDto } from '../../bids/dto/createBid.dto';
import {
  PaginatedBidsResultDto,
  PaginationDto,
} from '../../utils/dto/pagination.dto';
import { UpdateBidDto } from '../../bids/dto/updateBid.dto';
import { plainUser } from '../../utils/mocks/users/plainUser';
import { plainAuction } from '../../utils/mocks/auctions/plainAuction';
import { plainExpectedBid } from '../../utils/mocks/bids/plainBid';
import { UsersService } from '../../users/users.service';

describe('The BidsService', () => {
  let bidsService: BidsService;

  const getOneSpy = jest.fn();

  const mockedAuctionsService = {
    getAuctionById: jest.fn(),
    updateAuctionCurrentValue: jest.fn(),
    extendAuction: jest.fn(),
  };

  const mockedUsersRepository = {
    update: jest.fn(),
  };

  const mockedUsersService = {
    checkLevel: jest.fn(),
  };

  const mockedBidsRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    count: jest.fn(),
    update: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      offset: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      getOne: getOneSpy,
      getMany: jest.fn().mockResolvedValue([new Bid()]),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BidsService,
        {
          provide: getRepositoryToken(Bid),
          useValue: mockedBidsRepository,
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockedUsersRepository,
        },
        {
          provide: AuctionsService,
          useValue: mockedAuctionsService,
        },
        {
          provide: UsersService,
          useValue: mockedUsersService,
        },
      ],
    }).compile();

    bidsService = await module.get(BidsService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('When the service is called', () => {
    it('should be defined', () => {
      expect(bidsService).toBeDefined();
    });
  });

  describe('when creating a bid', () => {
    let auction: Auction;
    let expectedBid: Bid;
    let userOne: UserEntity;

    beforeEach(() => {
      auction = plainToClass(Auction, plainAuction);
      userOne = plainToClass(UserEntity, plainUser);
    });

    describe('when the auction has no bids', () => {
      it('should return a bid', async () => {
        expectedBid = plainToClass(Bid, plainExpectedBid);
        mockedAuctionsService.getAuctionById = jest
          .fn()
          .mockResolvedValueOnce(auction);
        mockedAuctionsService.updateAuctionCurrentValue = jest
          .fn()
          .mockResolvedValueOnce(auction);
        mockedBidsRepository.findOne = jest
          .fn()
          .mockResolvedValueOnce(undefined)
          .mockResolvedValueOnce(undefined);
        mockedBidsRepository.create = jest
          .fn()
          .mockReturnValue(plainToClass(Bid, { auction, user: userOne }));

        const createBidBody: CreateBidDto = {
          auctionId: faker.datatype.uuid(),
        };

        const newBid = await bidsService.createBid(createBidBody, userOne);
        newBid.createdAt = null;
        newBid.updatedAt = null;

        expect(newBid).toEqual(expectedBid);
      });
    });
    describe('when the auction does not exist', () => {
      it('should throw NoEntriesFound error', async () => {
        mockedAuctionsService.getAuctionById = jest
          .fn()
          .mockResolvedValueOnce(undefined);
        const createBidBody: CreateBidDto = {
          auctionId: faker.datatype.uuid(),
        };
        await expect(
          bidsService.createBid(createBidBody, userOne),
        ).rejects.toThrow('NoEntriesFound');
      });
    });
    describe('when the auction has not started yet', () => {
      it('should throw AuctionIsNotAvailable error', async () => {
        auction.startDate = auction.endDate;
        mockedAuctionsService.getAuctionById = jest
          .fn()
          .mockResolvedValueOnce(auction);
        const createBidBody: CreateBidDto = {
          auctionId: faker.datatype.uuid(),
        };

        await expect(
          bidsService.createBid(createBidBody, userOne),
        ).rejects.toThrow('AuctionIsNotAvailable');
      });
    });
    describe('when the auction has already ended', () => {
      it('should throw AuctionIsNotAvailable error', async () => {
        auction.endDate = auction.startDate;
        mockedAuctionsService.getAuctionById = jest
          .fn()
          .mockResolvedValueOnce(auction);
        const createBidBody: CreateBidDto = {
          auctionId: faker.datatype.uuid(),
        };

        await expect(
          bidsService.createBid(createBidBody, userOne),
        ).rejects.toThrow('AuctionIsNotAvailable');
      });
    });
  });

  describe('When getting all bids', () => {
    let bid: Bid;
    let bidCount: number;

    beforeEach(() => {
      bid = new Bid();
      bidCount = 1;
      mockedBidsRepository.count = jest.fn().mockResolvedValue(bidCount);
    });

    it('should return all the bids', async () => {
      const pagination: PaginationDto = {
        page: 1,
        limit: 10,
      };
      const PaginatedBidsResult: PaginatedBidsResultDto = {
        totalCount: bidCount,
        page: pagination.page,
        limit: pagination.limit,
        data: [bid],
      };
      const fetchedBids = await bidsService.getBids(pagination);
      expect(fetchedBids).toEqual(PaginatedBidsResult);
    });
  });

  describe('When getting one bid by its id', () => {
    it('should return the bid', async () => {
      const bid: Bid = new Bid();
      mockedBidsRepository.findOne = jest.fn().mockResolvedValue(bid);

      const fetchedBid = await bidsService.getBidById(1);
      expect(fetchedBid).toEqual(bid);
    });

    it('should throw NoEntriesFound error', async () => {
      mockedBidsRepository.findOne = jest.fn().mockResolvedValue(undefined);
      await expect(bidsService.getBidById(1)).rejects.toThrow('NoEntriesFound');
    });
  });

  describe('when getting users bids', () => {
    const bid: Bid = new Bid();
    const bidCount = 1;

    it('should return all the bids', async () => {
      mockedBidsRepository.count = jest.fn().mockResolvedValue(bidCount);
      const pagination: PaginationDto = {
        page: 1,
        limit: 10,
      };
      const PaginatedBidsResult: PaginatedBidsResultDto = {
        totalCount: bidCount,
        page: pagination.page,
        limit: pagination.limit,
        data: [bid],
      };
      const fetchedBids = await bidsService.getUserBids(1, pagination);
      expect(fetchedBids).toEqual(PaginatedBidsResult);
    });
  });

  describe('when updating a bid', () => {
    const updateBidBody: UpdateBidDto = { value: 100, itemId: 2 };
    const bid: Bid = new Bid();

    describe('when update body is provided', () => {
      describe('and when the bid is matched', () => {
        it('should return updated bid', async () => {
          mockedBidsRepository.findOne = jest.fn().mockResolvedValue(bid);
          const updatedBid = await bidsService.updateBid(1, updateBidBody);
          expect(updatedBid).toBe(bid);
        });
      });

      describe('when the bid is not matched', () => {
        it('should throw NoEntriesFound error', async () => {
          mockedBidsRepository.findOne = jest.fn().mockResolvedValue(undefined);
          await expect(bidsService.updateBid(1, updateBidBody)).rejects.toThrow(
            'NoEntriesFound',
          );
        });
      });
    });
  });
});
