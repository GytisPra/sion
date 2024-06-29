import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Req,
  Query,
  Put,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { LoggerService } from 'sion-logger';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';

import { JwtAuthenticationGuard } from '../authentication/guards/jwtAuthentication.guard';
import { RequestWithUser } from '../authentication/interfaces/requestWithUser.interface';
import { VerificationGuard } from '../authentication/guards/verification.guard';

import { AuctionsService } from './auctions.service';
import { BidsService } from '../bids/bids.service';
import { CommentsService } from '../comments/comments.service';

import { CreateAuctionDto } from './dto/createAuction.dto';
import { CreateBidDto } from '../bids/dto/createBid.dto';
import {
  PaginatedAuctionsResultDto,
  PaginationDto,
} from '../utils/dto/pagination.dto';
import { createCommentDto } from '../comments/dto/createComment.dto';
import { UpdateAuctionDto } from './dto/updateAuction.dto';

@ApiTags('auctions')
@Controller('auctions')
@UseGuards(JwtAuthenticationGuard, VerificationGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class AuctionsController {
  constructor(
    private readonly auctionsService: AuctionsService,
    private readonly bidsService: BidsService,
    private readonly commentsService: CommentsService,
    private logger: LoggerService,
  ) {
    this.logger.layer = 'AuctionsController';
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The auction has been successfully created.',
  })
  @ApiForbiddenResponse({ description: 'Failed.' })
  async createAuction(
    @Body() createAuctionBody: CreateAuctionDto,
    @Req() request: RequestWithUser,
  ) {
    this.logger.development.info('Starting auction creation', {
      involved: 'create_auction',
    });

    return this.auctionsService.createAuction(createAuctionBody, request.user);
  }

  @Post('bid')
  @ApiCreatedResponse({ description: 'The bid has been successfully created.' })
  @ApiForbiddenResponse({ description: 'Failed.' })
  async createBid(
    @Body() createBidBody: CreateBidDto,
    @Req() request: RequestWithUser,
  ) {
    this.logger.development.info({
      involved: 'create_auction_bid',
    });

    return this.bidsService.createBid(createBidBody, request.user);
  }

  @Post('comment')
  @ApiCreatedResponse({
    description: 'The comment has been successfully posted.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createComment(
    @Body() createCommentBody: createCommentDto,
    @Req() request: RequestWithUser,
  ) {
    this.logger.development.info({
      involved: 'create_auction_comment',
    });
    return this.commentsService.createComment(createCommentBody, request.user);
  }

  @Put(':auctionId')
  @ApiCreatedResponse({
    description: 'The auction has been successfully updated.',
  })
  @ApiForbiddenResponse({ description: 'Failed.' })
  @ApiBody({ type: UpdateAuctionDto })
  async updateAuction(
    @Param('auctionId') auctionId: string,
    @Body() UpdateAuctionBody: UpdateAuctionDto,
  ) {
    return this.auctionsService.updateAuction(auctionId, UpdateAuctionBody);
  }

  @Get('users/:userId')
  @ApiOkResponse({
    description: 'Users auctions have been successfully returned.',
  })
  @ApiForbiddenResponse({ description: 'Failed.' })
  async getUserAuctions(
    @Param('userId') userId: string,
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedAuctionsResultDto> {
    this.logger.development.info({
      involved: 'get_user_auctions',
    });
    paginationDto.page = Number(paginationDto.page);
    paginationDto.limit = Number(paginationDto.limit);
    return this.auctionsService.getUserAuctions(userId, {
      ...paginationDto,
      limit: paginationDto.limit > 10 ? 10 : paginationDto.limit,
    });
  }

  @Get(':id')
  @ApiOkResponse({ description: 'The auction has been successfully returned.' })
  @ApiForbiddenResponse({ description: 'Failed.' })
  async getAuction(@Param('id') id: string) {
    this.logger.development.info('Getting auction by id.', {
      involved: 'get_auction_by_id',
      meta: {
        id,
      },
    });
    return this.auctionsService.getAuctionById(id);
  }

  @Get()
  @ApiOkResponse({ description: 'Auctions have been successfully returned.' })
  @ApiForbiddenResponse({ description: 'Failed.' })
  async getAuctions(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedAuctionsResultDto> {
    this.logger.development.info({
      involved: 'get_auctions',
    });
    paginationDto.page = Number(paginationDto.page);
    paginationDto.limit = Number(paginationDto.limit);

    return this.auctionsService.getAuctions({
      ...paginationDto,
      limit: paginationDto.limit > 10 ? 10 : paginationDto.limit,
    });
  }
  @Get('terminate/:id')
  @ApiOkResponse({
    description: 'The auction has been successfully terminated.',
  })
  @ApiForbiddenResponse({
    description:
      "Failed if the auction doesn't exist or if the auction has already ended or it's less then 4h to the end.",
  })
  async terminateAuction(@Param('id') id: string) {
    this.logger.development.info({
      involved: 'terminate_auction',
    });
    return this.auctionsService.terminateAuction(id);
  }

  @Get('cancel/:id')
  @ApiOkResponse({
    description: 'The auction has been successfully cancelled.',
  })
  @ApiForbiddenResponse({
    description:
      "Failed if the auction doesn't exist or if the auction has already ended or it's less then 4h to the end.",
  })
  async cancelAuction(@Param('id') id: string) {
    this.logger.development.info({
      involved: 'cancel_auction',
    });
    return this.auctionsService.cancelAuction(id);
  }

  @Post('renew/:id')
  @ApiOkResponse({
    description: 'The auction has been successfully renewed.',
  })
  @ApiForbiddenResponse({
    description:
      'Failed if the renewal time is invalid, if the auction is still active,\
      if the auction has ended and there were bids placed, if there was no new endDate provided.',
  })
  async renewAuction(
    @Param('id') id: string,
    @Body() updateAuctionBody: UpdateAuctionDto,
  ) {
    this.logger.development.info({
      involved: 'renew_auction',
    });

    return this.auctionsService.renewAuction(id, updateAuctionBody);
  }
}
