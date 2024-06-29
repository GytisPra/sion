import {
  Controller,
  Get,
  Body,
  Param,
  Query,
  UseGuards,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoggerService } from 'sion-logger';

import { JwtAuthenticationGuard } from '../authentication/guards/jwtAuthentication.guard';

import { BidsService } from './bids.service';
import { UpdateBidDto } from './dto/updateBid.dto';
import {
  PaginatedBidsResultDto,
  PaginationDto,
} from '../utils/dto/pagination.dto';

@ApiTags('bids')
@Controller('bids')
@UseGuards(JwtAuthenticationGuard)
export class BidsController {
  constructor(
    private readonly bidsService: BidsService,
    private logger: LoggerService,
  ) {
    this.logger.layer = 'BidsController';
  }

  @Get()
  @ApiOkResponse({ description: 'The bids have been successfully returned.' })
  @ApiForbiddenResponse({ description: 'Failed.' })
  @ApiBearerAuth()
  async getBids(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedBidsResultDto> {
    return this.bidsService.getBids({
      ...paginationDto,
      limit: paginationDto.limit > 10 ? 10 : paginationDto.limit,
    });
  }

  @Get(':id')
  @ApiOkResponse({ description: 'The bid has been successfully returned.' })
  @ApiForbiddenResponse({ description: 'Failed.' })
  async getBidById(@Param('id') id: string) {
    return this.bidsService.getBidById(Number(id));
  }

  @Get('users/:userId')
  @ApiOkResponse({ description: 'Users bid has been successfully returned.' })
  @ApiForbiddenResponse({ description: 'Failed.' })
  async getUserItems(
    @Param('userId') userId: string,
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedBidsResultDto> {
    paginationDto.page = Number(paginationDto.page);
    paginationDto.limit = Number(paginationDto.limit);
    return this.bidsService.getUserBids(Number(userId), {
      ...paginationDto,
      limit: paginationDto.limit > 10 ? 10 : paginationDto.limit,
    });
  }

  @Put(':id')
  @ApiCreatedResponse({ description: 'The bid has been successfully updated.' })
  @ApiForbiddenResponse({ description: 'Failed.' })
  @UseGuards(JwtAuthenticationGuard)
  async updateBid(
    @Param('id') id: string,
    @Body() updateBidBody: UpdateBidDto,
  ) {
    return this.bidsService.updateBid(Number(id), updateBidBody);
  }
}
