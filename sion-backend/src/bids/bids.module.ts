import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'sion-logger';

import { Bid } from './bid.entity';
import { Auction } from '../auctions/auction.entity';
import { BidsController } from './bids.controller';
import { BidsService } from './bids.service';
import { ItemImage } from '../files/itemImage.entity';
import { Item } from '../items/item.entity';
import { Category } from '../categories/category.entity';
import { UsersModule } from '../users/users.module';
import { AuctionsModule } from 'src/auctions/auctions.module';
import { ItemsModule } from 'src/items/items.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [
    forwardRef(() => AuctionsModule),
    TypeOrmModule.forFeature([ItemImage, Auction, Bid, Item, Category]),
    BullModule.registerQueue({
      name: 'auction-queue',
    }),
    UsersModule,
    LoggerModule,
    ConfigModule,
    ItemsModule,
    FilesModule,
  ],
  controllers: [BidsController],
  providers: [BidsService],
  exports: [BidsService],
})
export class BidsModule {}
