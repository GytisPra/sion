import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'sion-logger';

import { AuctionsConsumer } from './auctions.consumer';
import { AuctionsController } from './auctions.controller';
import { AuctionsService } from './auctions.service';
import { Auction } from './auction.entity';
import { BidIncrementFactory } from './factories/bidIncrementFactory';

import { UsersModule } from '../users/users.module';
import { CommentsModule } from '../comments/comments.module';
import { FilesModule } from '../files/files.module';
import { ItemsModule } from '../items/items.module';
import { BidsModule } from '../bids/bids.module';

import { Bid } from '../bids/bid.entity';
import { Notification } from '../notifications/notification.entity';

@Module({
  imports: [
    forwardRef(() => CommentsModule),
    forwardRef(() => BidsModule),
    TypeOrmModule.forFeature([Auction, Bid, Notification]),
    BullModule.registerQueue({
      name: 'auction-queue',
    }),
    UsersModule,
    LoggerModule,
    ConfigModule,
    FilesModule,
    ItemsModule,
  ],
  providers: [AuctionsService, AuctionsConsumer, BidIncrementFactory],
  controllers: [AuctionsController],
  exports: [AuctionsService],
})
export class AuctionsModule {}
