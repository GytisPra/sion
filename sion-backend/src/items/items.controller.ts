import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Req,
  Put,
  ClassSerializerInterceptor,
  UseInterceptors,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoggerService } from 'sion-logger';

import { JwtAuthenticationGuard } from '../authentication/guards/jwtAuthentication.guard';

import { CreateItemDto } from './dto/createItem.dto';
import { UpdateItemDto } from './dto/updateItem.dto';
import {
  PaginatedItemsResultDto,
  PaginationDto,
} from '../utils/dto/pagination.dto';
import { ItemsService } from './items.service';
import { RequestWithUser } from '../authentication/interfaces/requestWithUser.interface';
import { VerificationGuard } from '../authentication/guards/verification.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileFormatIsWrong } from '../utils/exceptions/fileFormatIsWrong.exception';

@ApiTags('items')
@Controller('items')
@UseGuards(JwtAuthenticationGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class ItemsController {
  constructor(
    private readonly itemsService: ItemsService,
    private logger: LoggerService,
  ) {
    this.logger.layer = 'ItemsController';
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard, VerificationGuard)
  @ApiBody({ type: CreateItemDto })
  @ApiCreatedResponse({
    description: 'The item has been successfully created.',
  })
  async createItem(
    @Body() createItemBody: CreateItemDto,
    @Req() request: RequestWithUser,
  ) {
    this.logger.development.info({
      involved: 'create_item',
    });
    return this.itemsService.createItem(createItemBody, request.user);
  }

  @Post('images/:itemId')
  @UseGuards(JwtAuthenticationGuard, VerificationGuard)
  @UseInterceptors(
    FilesInterceptor('images', 4, {
      limits: { fileSize: 5 * 10 * 10 * 10 * 10 * 10 * 10 }, // 5mb LIMIT
      fileFilter: (_req: Request, file: Express.Multer.File, cb) => {
        const mimetype = file.mimetype;
        if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
          return cb(
            new FileFormatIsWrong(file.mimetype, file.originalname),
            false,
          );
        }
        return cb(null, true);
      },
    }),
  )
  async addImages(
    @UploadedFiles() uploadedImages: [Express.Multer.File],
    @Param('itemId') itemId: string,
  ) {
    this.logger.development.info('Adding images to item.', {
      involved: 'add_images',
    });

    return this.itemsService.addImages(uploadedImages, itemId);
  }

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  @ApiOkResponse({
    description: 'All items have been successfully found.',
  })
  @ApiForbiddenResponse({ description: 'Failed.' })
  async getItems(
    @Query() paginationBody: PaginationDto,
    @Query('withUser') withUser: boolean,
    @Query('withImages') withImages: boolean,
  ): Promise<PaginatedItemsResultDto> {
    this.logger.development.info({
      involved: 'get_items',
      meta: {
        page: paginationBody.page,
      },
    });

    paginationBody.page = Number(paginationBody.page);
    paginationBody.limit = Number(paginationBody.limit);
    return this.itemsService.getItems(
      {
        ...paginationBody,
        limit: paginationBody.limit > 10 ? 10 : paginationBody.limit,
      },
      withUser,
      withImages,
    );
  }

  @Get(':itemId')
  @UseGuards(JwtAuthenticationGuard)
  @ApiOkResponse({
    description:
      'An item that is matching the ID provided has been successfully found',
  })
  @ApiForbiddenResponse({ description: 'Failed if the item is not found.' })
  async getItemById(
    @Param('itemId') itemId: string,
    @Query('withUser') withUser: boolean,
    @Query('withImages') withImages: boolean,
  ) {
    this.logger.development.info({
      involved: 'get_item_by_id',
      meta: {
        itemId: itemId,
      },
    });
    return this.itemsService.getItemById(Number(itemId), withUser, withImages);
  }

  @Get('users/:userId')
  @ApiOkResponse({
    description: 'All user items have been found successfully',
  })
  @ApiForbiddenResponse({ description: 'Failed.' })
  @UseGuards(JwtAuthenticationGuard)
  async getUserItems(
    @Param('userId') userId: string,
    @Query() paginationBody: PaginationDto,
    @Query('withImages') withImages: boolean,
  ): Promise<PaginatedItemsResultDto> {
    this.logger.development.info({
      involved: 'get_user_items',
      meta: {
        userId: userId,
        page: paginationBody.page,
      },
    });
    paginationBody.page = Number(paginationBody.page);
    paginationBody.limit = Number(paginationBody.limit);
    return this.itemsService.getUserItems(
      Number(userId),
      {
        ...paginationBody,
        limit: paginationBody.limit > 10 ? 10 : paginationBody.limit,
      },
      withImages,
    );
  }

  @Put(':itemId')
  @UseGuards(JwtAuthenticationGuard)
  @ApiBody({ type: UpdateItemDto })
  @ApiOkResponse({
    description: 'The item is updated successfully.',
  })
  @ApiForbiddenResponse({
    description:
      'Failed if the item is not found or if the updateItemBody is not provided.',
  })
  async updateItem(
    @Param('itemId') itemId: string,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    this.logger.development.info({
      involved: 'update_item',
      meta: {
        itemId: itemId,
        changes: updateItemDto,
      },
    });
    return this.itemsService.updateItem(Number(itemId), updateItemDto);
  }
}
