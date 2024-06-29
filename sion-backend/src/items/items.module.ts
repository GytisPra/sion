import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'sion-logger';

import { Item } from './item.entity';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

import { FilesModule } from '../files/files.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item]),
    LoggerModule,
    FilesModule,
    ConfigModule,
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
  exports: [ItemsService],
})
export class ItemsModule {}
