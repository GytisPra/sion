import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { getQueueToken } from '@nestjs/bull';
import { Job } from 'bullmq';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

import { Auction } from '../../auctions/auction.entity';
import { AuctionsService } from '../../auctions/auctions.service';
import { plainToClass } from 'class-transformer';
import { UserEntity } from '../../users/serializers/users.serializer';
import { plainUser } from '../../utils/mocks/users/plainUser';
import { CreateAuctionDto } from '../../auctions/dto/createAuction.dto';
import { AuctionType } from '../../enums/auctionType.enum';
import { BidIncrementFactory } from '../factories/bidIncrementFactory';
import { ItemsService } from '../../items/items.service';
import { Item } from '../../items/item.entity';
import { plainItem } from '../../utils/mocks/item/plainItem';

class MockedRepository {
  public async findOne() {
    return jest.fn();
  }

  public create() {
    return jest.fn();
  }

  public async save() {
    return jest.fn();
  }
}

class MockedItemsService {
  public async createItem() {
    return jest.fn();
  }
}

describe('The auctions service', () => {
  let auctionService: AuctionsService;
  let auctionsRepository: Repository<Auction>;
  let itemsService: ItemsService;

  const mockedAuctionQueue = {
    add: jest.fn(),
    getJob: jest.fn(() => Job),
    removeJobs: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuctionsService,
        {
          provide: getRepositoryToken(Auction),
          useClass: MockedRepository,
        },
        {
          provide: getQueueToken('auction-queue'),
          useValue: mockedAuctionQueue,
        },
        {
          provide: ConfigService,
          useValue: {},
        },
        BidIncrementFactory,
        {
          provide: ItemsService,
          useClass: MockedItemsService,
        },
      ],
      imports: [BullModule.registerQueue({ name: 'auction-queue' })],
    }).compile();

    auctionService = module.get(AuctionsService);
    auctionsRepository = module.get(getRepositoryToken(Auction));
    itemsService = module.get(ItemsService);
  });

  describe('When the service is called', () => {
    it('should be defined', () => {
      expect(auctionService).toBeDefined();
    });
  });

  describe('When creating a new auction', () => {
    const validAuctionData: CreateAuctionDto = {
      title: faker.commerce.productName(),
      subcategory: faker.datatype.uuid(),
      description: faker.commerce.productDescription(),
      startingPrice: Number(faker.commerce.price(100)),
      endDate: faker.date.soon(),
      auctionType: [AuctionType.buyNow],
      brand: faker.company.companyName(),
    };

    const fakeUser = plainToClass(UserEntity, plainUser);
    const fakeItem = plainToClass(Item, plainItem);

    it('Should create auction if provided body and user is valid', async () => {
      const createdAuctionEntity = plainToClass(Auction, validAuctionData);

      const savedAuction = plainToClass(Auction, {
        ...validAuctionData,
        createdByUser: fakeUser,
      });

      const auctionsRepositoryCreateSpy = jest
        .spyOn(auctionsRepository, 'create')
        .mockReturnValue(createdAuctionEntity);

      const auctionsRepositorySaveSpy = jest
        .spyOn(auctionsRepository, 'save')
        .mockResolvedValue(savedAuction);

      const itemsServiceCreateItemSpy = jest
        .spyOn(itemsService, 'createItem')
        .mockResolvedValue(fakeItem);

      const result = await auctionService.createAuction(
        validAuctionData,
        fakeUser,
      );

      expect(auctionsRepositoryCreateSpy).toBeCalledWith(validAuctionData);
      expect(auctionsRepositorySaveSpy).toBeCalledWith(createdAuctionEntity);
      expect(itemsServiceCreateItemSpy).toBeCalledWith(
        {
          subcategory: validAuctionData.subcategory,
          brand: validAuctionData.brand,
        },
        fakeUser,
      );
      expect(result).toEqual(savedAuction);
    });

    // it('Should throw an error if provided body is valid, but user is not found', async () => {
    //   expect.assertions(1);
    //   await expect(
    //     auctionService.createAuction(validAuctionData, fakeUser),
    //   ).rejects.toThrow('NoEntriesFound');
    // });
  });

  // describe('when getting users auctions', () => {
  //   auction = plainToClass(Auction, plainAuction);
  //   const auctionCount = 1;
  //   mockedAuctionsRepository.count.mockResolvedValue(auctionCount);

  //   it('should return all the users auctions', async () => {
  //     const pagination: PaginationDto = {
  //       page: 1,
  //       limit: 10,
  //     };

  //     const ExpectedPaginatedBidsResult: PaginatedAuctionsResultDto = {
  //       totalCount: 1,
  //       page: pagination.page,
  //       limit: pagination.limit,
  //       data: [auction],
  //     };

  //     const PaginatedBidsResult = await auctionService.getUserAuctions(
  //       '1',
  //       pagination,
  //     );

  //     expect(PaginatedBidsResult).toEqual(ExpectedPaginatedBidsResult);
  //   });
  // });

  // describe('when updating a auction', () => {
  //   const auction = plainToClass(Auction, plainAuction);
  //   const updateAuctionbody: UpdateAuctionDto = {
  //     auctionType: auction.auctionType,
  //     startingValue: auction.startingValue,
  //     buyNowValue: auction.buyNowValue,
  //     bidIncrementValue: auction.bidIncrementValue,
  //     createdByUser: auction.createdByUser,
  //     itemId: auction.itemId,
  //     endDate: auction.endDate,
  //     grandAuctionStart: auction.grandAuctionStart,
  //     currentValue: auction.currentValue,
  //   };

  //   it('should return updated auction', async () => {
  //     getOneSpy.mockReturnValue(auction);
  //     mockedAuctionsRepository.findOne = jest.fn().mockResolvedValue(auction);
  //     const updatedAuction = await auctionService.updateAuction(
  //       auction.id,
  //       updateAuctionbody,
  //     );

  //     expect(updatedAuction).toBe(auction);
  //   });

  //   it('should throw NoEntriesFound error', async () => {
  //     getOneSpy.mockReturnValue(undefined);

  //     await expect(
  //       auctionService.updateAuction(auction.id, updateAuctionbody),
  //     ).rejects.toThrow('NoEntriesFound');
  //   });
  // });
  // describe('When updating auctions current value', () => {
  //   const updateValue = 110;
  //   const auction: Auction = plainToClass(Auction, plainAuction);

  //   it('should return auction with updated current value field', async () => {
  //     mockedAuctionsRepository.findOne = jest.fn().mockResolvedValue(auction);
  //     auction.currentValue = updateValue;
  //     mockedAuctionsRepository.update = jest.fn().mockResolvedValue(auction);

  //     const updatedAuction = await auctionService.updateAuctionCurrentValue(
  //       auction.id,
  //       updateValue,
  //     );
  //     expect(updatedAuction).toBe(auction);
  //   });
  // });

  // describe('When updating auctions type', () => {
  //   const updatedAuctionType: AuctionType[] = [
  //     AuctionType.buyNow,
  //     AuctionType.multiItemListing,
  //   ];
  //   const auction = plainToClass(Auction, plainAuction);

  //   it('should return auction with updated auctoin type field', async () => {
  //     mockedAuctionsRepository.findOne = jest.fn().mockResolvedValue(auction);
  //     auction.auctionType = updatedAuctionType;
  //     mockedAuctionsRepository.update = jest.fn().mockReturnValue(auction);

  //     const updatedAuction = await auctionService.updateAuctionType(
  //       auction.id,
  //       updatedAuctionType,
  //     );

  //     expect(updatedAuction).toEqual(auction);
  //   });
  // });

  // describe('When getting one auction by its id', () => {
  //   const auction: Auction = plainToClass(Auction, plainAuction);

  //   it('should return the auction', async () => {
  //     getOneSpy.mockReturnValue(auction);
  //     const fetchedBid = await auctionService.getAuctionById(1);
  //     expect(fetchedBid).toEqual(auction);
  //   });

  //   it('should throw NoEntriesFound error', async () => {
  //     getOneSpy.mockReturnValue(undefined);
  //     await expect(auctionService.getAuctionById(auction.id)).rejects.toThrow(
  //       'NoEntriesFound',
  //     );
  //   });
  // });

  // describe('When getting all auction', () => {
  //   auction = plainToClass(Auction, plainAuction);
  //   const auctionCount = 1;
  //   mockedAuctionsRepository.count.mockResolvedValue(auctionCount);

  //   it('should return all the  auctions', async () => {
  //     const pagination: PaginationDto = {
  //       page: 1,
  //       limit: 10,
  //     };

  //     const ExpectedPaginatedBidsResult: PaginatedAuctionsResultDto = {
  //       totalCount: 1,
  //       page: pagination.page,
  //       limit: pagination.limit,
  //       data: [auction],
  //     };

  //     const PaginatedBidsResult = await auctionService.getUserAuctions(
  //       '1',
  //       pagination,
  //     );

  //     expect(PaginatedBidsResult).toEqual(ExpectedPaginatedBidsResult);
  //   });
  // });

  // describe('When terminating an auction', () => {
  //   auction = plainToClass(Auction, plainAuction);
  //   beforeEach(() => {
  //     getOneSpy.mockReturnValue(auction);
  //   });

  //   it("should return the terminated auction with it's status updated", async () => {
  //     const terminatedAuction = await auctionService.terminateAuction(
  //       auction.id,
  //     );

  //     expect(terminatedAuction.auctionStatus).toEqual(AuctionStatus.TERMINATED);
  //   });
  //   it('should throw an error if the auction is not found', async () => {
  //     getOneSpy.mockReturnValue(undefined);

  //     await expect(auctionService.terminateAuction(auction.id)).rejects.toThrow(
  //       'NoEntriesFound',
  //     );
  //   });
  //   it('should throw an error if the time is invalid', async () => {
  //     auction.endDate = new Date(Date.now());

  //     await expect(auctionService.terminateAuction(auction.id)).rejects.toThrow(
  //       'CancellationTimeIsInavlid',
  //     );
  //   });
  // });

  // describe('When cancelling an auction', () => {
  //   auction = plainToClass(Auction, plainAuction);
  //   beforeEach(() => {
  //     getOneSpy.mockReturnValue(auction);
  //   });

  //   it('should return the canceled auction', async () => {
  //     auction.endDate = new Date(Date.now() + 15400000);

  //     const cancelledAuction = await auctionService.cancelAuction(auction.id);

  //     expect(cancelledAuction).toEqual(auction);
  //   });
  //   it('should throw an error if the auction is not found', async () => {
  //     getOneSpy.mockReturnValue(undefined);

  //     await expect(auctionService.cancelAuction(auction.id)).rejects.toThrow(
  //       'NoEntriesFound',
  //     );
  //   });
  //   it('should throw an error if the time is invalid', async () => {
  //     auction.endDate = new Date(Date.now());

  //     await expect(auctionService.cancelAuction(auction.id)).rejects.toThrow(
  //       'CancellationTimeIsInavlid',
  //     );
  //   });
  // });

  // describe('When renewing an auction', () => {
  //   auction = plainToClass(Auction, plainAuction);
  //   userOne = plainToClass(UserEntity, plainUser);

  //   const updateAuctionBody: UpdateAuctionDto = {
  //     auctionType: [],
  //     startingValue: undefined,
  //     buyNowValue: undefined,
  //     bidIncrementValue: undefined,
  //     createdByUser: undefined,
  //     itemId: undefined,
  //     endDate: new Date(Date.now() + 600000),
  //     grandAuctionStart: undefined,
  //     currentValue: null,
  //   };

  //   beforeEach(() => {
  //     auction.soldToUser = null;
  //     auction.auctionStatus = AuctionStatus.ENDED;
  //     updateAuctionBody.endDate = new Date(Date.now() + 600000);
  //     getOneSpy.mockReturnValue(auction);
  //   });

  //   it('should return the renewed auction', async () => {
  //     auction.endDate = new Date(Date.now() + 15400000);

  //     auctionService.getAuctionById = jest.fn().mockResolvedValue(auction);

  //     const renewedAuction = await auctionService.renewAuction(
  //       auction.id,
  //       updateAuctionBody,
  //     );

  //     expect(renewedAuction).toEqual(auction);
  //   });
  //   it('should throw an error if the auction is not found', async () => {
  //     getOneSpy.mockReturnValue(undefined);

  //     await expect(
  //       auctionService.renewAuction(auction.id, updateAuctionBody),
  //     ).rejects.toThrow('NoEntriesFound');
  //   });
  //   it('should throw an error if the auction is active', async () => {
  //     auction.auctionStatus = AuctionStatus.ACTIVE;

  //     await expect(
  //       auctionService.renewAuction(auction.id, updateAuctionBody),
  //     ).rejects.toThrow('RenewalTimeInvalid');
  //   });
  //   it('should throw an error if someone won the auction', async () => {
  //     auction.soldToUser = userOne;

  //     await expect(
  //       auctionService.renewAuction(auction.id, updateAuctionBody),
  //     ).rejects.toThrow('RenewalUnavailable');
  //   });
  //   it('should throw an error if there is no endDate in updateAuctionBody', async () => {
  //     updateAuctionBody.endDate = null;

  //     await expect(
  //       auctionService.renewAuction(auction.id, updateAuctionBody),
  //     ).rejects.toThrow('RenewalInvalid');
  //   });

  //   it('should throw an error if the endDate in updateAuctionBody is invalid', async () => {
  //     updateAuctionBody.endDate = new Date(Date.now());

  //     await expect(
  //       auctionService.renewAuction(auction.id, updateAuctionBody),
  //     ).rejects.toThrow('AuctionTimeIsInvalid');
  //   });
  // });
});
