import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';

import { CommentsService } from './comments.service';
import { Comment } from './comment.entity';
import { AuctionsModule } from '../auctions/auctions.module';

@Module({
  imports: [
    forwardRef(() => AuctionsModule),
    TypeOrmModule.forFeature([Comment]),
    BullModule.registerQueue({
      name: 'auction-queue',
    }),
  ],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
