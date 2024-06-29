import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { EntitySchema, Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

import { Item } from '../item.entity';
import { ItemsService } from '../items.service';
import { CreateItemDto } from '../dto/createItem.dto';
import { UpdateItemDto } from '../dto/updateItem.dto';
import { UserEntity } from '../../users/serializers/users.serializer';
import { ItemImage } from '../../files/itemImage.entity';
import { FilesService } from '../../files/files.service';
import {
  PaginatedItemsResultDto,
  PaginationDto,
} from '../../utils/dto/pagination.dto';
import { ItemNotFound } from '../../utils/exceptions/itemNotFound.exception';
import { NoUpdateBodyProvided } from '../../utils/exceptions/noUpdateBodyProvided.exception';
import { plainUser } from '../../utils/mocks/users/plainUser';
import { plainItem } from '../../utils/mocks/item/plainItem';
import { plainItemImage } from '../../utils/mocks/item/plainItemImage';
import { Category } from '../../categories/category.entity';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<Record<string, unknown>>;
};

export const repositoryMockFactory: () => MockType<Repository<EntitySchema>> =
  jest.fn(() => ({
    findOne: jest.fn((entity) => entity),
    findAncestorsTree: jest.fn((entity) => entity),
    // ...
  }));

describe('The ItemsService', () => {
  let itemsService: ItemsService;

  let user = plainToClass(UserEntity, plainUser);
  let item = plainToClass(Item, plainItem);
  const getOneSpy = jest.fn();

  const mockedItemsRepository = {
    create: jest.fn(() => item),
    save: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    count: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      offset: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([item]),
      getOne: getOneSpy,
    })),
  };

  const mockedFilesService = {
    uploadPublicFile: jest
      .fn()
      .mockResolvedValue(plainToClass(ItemImage, plainItemImage)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: getRepositoryToken(Item),
          useValue: mockedItemsRepository,
        },
        {
          provide: FilesService,
          useValue: mockedFilesService,
        },
        {
          provide: getRepositoryToken(Category),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    itemsService = module.get<ItemsService>(ItemsService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('When the service is called', () => {
    it('should be defined', () => {
      expect(itemsService).toBeDefined();
    });
  });

  describe('when creating an item', () => {
    beforeEach(() => {
      user = plainToClass(UserEntity, plainUser);
      item = plainToClass(Item, plainItem);
    });
    it('should return an item if item was successfully created', async () => {
      const createItemBody: CreateItemDto = {
        subcategory: faker.datatype.uuid(),
        brand: faker.company.companyName(),
      };

      mockedItemsRepository.create = jest.fn().mockResolvedValue(item);

      const newItem = await itemsService.createItem(createItemBody, user);

      expect(newItem).toEqual(item);
    });
  });

  describe('when updating an item', () => {
    beforeEach(() => {
      item = plainToClass(Item, plainItem);
    });
    it('should return an updated item if item was found and the updateItemBody was provided', async () => {
      mockedItemsRepository.findOne = jest.fn().mockResolvedValue(item);
      const updateItemBody: UpdateItemDto = {
        brand: 'Test updated Brand',
      };

      const updatedItem = await itemsService.updateItem(1, updateItemBody);

      item.updatedAt = null;
      item.createdAt = null;

      expect(updatedItem).toEqual(item);
    });
    it('should throw an error if the updateitemBody is not provided', async () => {
      mockedItemsRepository.findOne = jest.fn().mockResolvedValue(item);
      const updateItemBody: UpdateItemDto = { brand: '' };

      expect(
        async () => await itemsService.updateItem(1, updateItemBody),
      ).rejects.toThrow(NoUpdateBodyProvided);
    });
    it('should thorw an error if the item is not found', async () => {
      mockedItemsRepository.findOne = jest.fn().mockResolvedValue(undefined);
      const updateItemBody: UpdateItemDto = {
        brand: faker.company.companyName(),
        subcategoryId: faker.datatype.uuid(),
      };
      expect(
        async () => await itemsService.updateItem(1, updateItemBody),
      ).rejects.toThrow(ItemNotFound);
    });
  });

  describe('when getting all items', () => {
    beforeEach(() => {
      item = plainToClass(Item, plainItem);
      const itemCount = 1;
      mockedItemsRepository.count.mockResolvedValue(itemCount);
    });
    it('should return items if the items were successfully found', async () => {
      const paginationBody: PaginationDto = {
        page: 1,
        limit: 10,
      };

      const ExpectedPaginatedItemsResult: PaginatedItemsResultDto = {
        totalCount: 1,
        page: paginationBody.page,
        limit: paginationBody.limit,
        data: [item],
      };

      const paginatedItemsResult = await itemsService.getItems(
        paginationBody,
        null,
        null,
      );

      expect(paginatedItemsResult).toEqual(ExpectedPaginatedItemsResult);
    });
  });

  describe('when getting an item by id', () => {
    beforeEach(() => {
      item = plainToClass(Item, plainItem);
    });
    it('should return an item if the item was successfully found', async () => {
      getOneSpy.mockReturnValue(item);
      const expectedItem = await itemsService.getItemById(1, null, null);

      expect(item).toEqual(expectedItem);
    });
    it('should throw an error if the item is not successfully found', async () => {
      getOneSpy.mockResolvedValue({});

      await expect(itemsService.getItemById(1, null, null)).rejects.toThrow(
        ItemNotFound,
      );
    });
  });

  describe('when getting user items', () => {
    beforeEach(() => {
      item = plainToClass(Item, plainItem);
      const itemCount = 1;
      mockedItemsRepository.count.mockResolvedValue(itemCount);
    });

    it('should return the items if they were successfully found', async () => {
      const paginationBody: PaginationDto = {
        page: 1,
        limit: 10,
      };

      const ExpectedPaginatedItemsResult: PaginatedItemsResultDto = {
        totalCount: 1,
        page: paginationBody.page,
        limit: paginationBody.limit,
        data: [item],
      };

      const paginatedItemsResult = await itemsService.getUserItems(
        1,
        paginationBody,
        null,
      );

      expect(paginatedItemsResult).toEqual(ExpectedPaginatedItemsResult);
    });
  });
});
