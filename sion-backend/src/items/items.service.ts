import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isEmpty } from 'lodash';

import { CreateItemDto } from './dto/createItem.dto';
import { UpdateItemDto } from './dto/updateItem.dto';
import {
  PaginatedItemsResultDto,
  PaginationDto,
} from '../utils/dto/pagination.dto';
import { ItemNotFound } from '../utils/exceptions/itemNotFound.exception';
import { Item } from './item.entity';
import { UserEntity } from '../users/serializers/users.serializer';
import { FilesService } from '../files/files.service';
import { NoImageProvided } from '../utils/exceptions/noImageProvided.exception';
import { NoUpdateBodyProvided } from '../utils/exceptions/noUpdateBodyProvided.exception';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
    private readonly filesService: FilesService,
  ) {}

  async createItem(createItemBody: CreateItemDto, user: UserEntity) {
    const newItem = this.itemsRepository.create({
      categoryGroupId: createItemBody.categoryGroup,
      categoryId: createItemBody.category,
      brand: createItemBody.brand,
      user,
    });

    await this.itemsRepository.save(newItem);

    return newItem;
  }

  async addImages(uploadedImages: Array<Express.Multer.File>, itemId: string) {
    if (!uploadedImages || uploadedImages.length <= 0) {
      throw new NoImageProvided();
    }

    const item = await this.itemsRepository
      .createQueryBuilder('item')
      .where('item.id = :id', { id: itemId })
      .getOne();

    item.images = [];

    for (let i = 0; i < uploadedImages.length; i++) {
      const newImage = await this.filesService.saveItemImage(
        uploadedImages[i].buffer,
        uploadedImages[i].originalname,
        item,
      );
      item.images.push(newImage);
    }

    return this.itemsRepository.save(item);
  }

  async updateItem(itemId: number, updateItemBody: UpdateItemDto) {
    const item = await this.itemsRepository.findOne(itemId);
    if (!item) {
      throw new ItemNotFound(itemId);
    }

    if (!updateItemBody.brand && !updateItemBody.subcategoryId) {
      throw new NoUpdateBodyProvided(updateItemBody);
    }

    await this.itemsRepository.update(itemId, updateItemBody);

    return this.itemsRepository.findOne(itemId, {
      relations: ['user', 'itemImages'],
    });
  }

  async getItems(
    paginationBody: PaginationDto,
    withUser: boolean,
    withImages: boolean,
  ): Promise<PaginatedItemsResultDto> {
    const skippedItems = (paginationBody.page - 1) * paginationBody.limit;
    const totalCount = await this.itemsRepository.count();

    const query = this.itemsRepository
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.auction', 'itemId')
      .orderBy('item.createdAt')
      .offset(skippedItems)
      .limit(paginationBody.limit);

    if (withImages) {
      query.leftJoinAndSelect('item.itemImages', 'itemImages');
    }
    if (withUser) {
      query.leftJoinAndSelect('item.user', 'user');
    }

    const items = await query.getMany();
    return {
      totalCount,
      page: paginationBody.page,
      limit: paginationBody.limit,
      data: items,
    };
  }

  async getItemById(itemId: number, withUser: boolean, withImages: boolean) {
    const query = this.itemsRepository
      .createQueryBuilder('item')
      .where({ id: itemId })
      .leftJoinAndSelect('item.auction', 'itemId');

    if (withImages) {
      query.leftJoinAndSelect('item.itemImages', 'itemImages');
    }
    if (withUser) {
      query.leftJoinAndSelect('item.user', 'user');
    }

    const item = await query.getOne();
    if (isEmpty(item)) {
      throw new ItemNotFound(itemId);
    }

    return item;
  }

  async getUserItems(
    userId: number,
    paginationBody: PaginationDto,
    withImages: boolean,
  ): Promise<PaginatedItemsResultDto> {
    const skippedItems = (paginationBody.page - 1) * paginationBody.limit;

    const totalCount = await this.itemsRepository.count({
      where: { user: userId },
    });

    const query = this.itemsRepository
      .createQueryBuilder('item')
      .where('user.id = :id', { id: userId })
      .leftJoinAndSelect('item.user', 'user')
      .leftJoinAndSelect('item.auction', 'itemId')
      .orderBy('item.createdAt')
      .offset(skippedItems)
      .limit(paginationBody.limit);

    if (withImages) {
      query.leftJoinAndSelect('item.itemImages', 'itemImages');
    }

    const items = await query.getMany();
    return {
      totalCount,
      page: paginationBody.page,
      limit: paginationBody.limit,
      data: items,
    };
  }
}
