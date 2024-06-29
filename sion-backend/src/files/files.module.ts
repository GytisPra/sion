import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'sion-logger';

import { FilesService } from './files.service';

import { ItemImage } from './itemImage.entity';
import { PublicFile } from './publicFile.entity';
import { UserImage } from './userImage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemImage, PublicFile, UserImage]),
    LoggerModule,
  ],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
