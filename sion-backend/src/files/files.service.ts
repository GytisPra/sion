import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';

import { ItemImage } from './itemImage.entity';
import { Item } from '../items/item.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(ItemImage)
    private publicFilesRepository: Repository<ItemImage>,
    private readonly configService: ConfigService,
  ) {}

  async saveFileToS3(dataBuffer: Buffer, filename: string) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Body: dataBuffer,
        Key: `${uuid()}-${filename}`,
      })
      .promise();

    const newFile = this.publicFilesRepository.create({
      key: uploadResult.Key,
      url: uploadResult.Location,
    });

    return this.publicFilesRepository.save(newFile);
  }

  async saveFileToDB(dataBuffer: Buffer, filename: string) {
    const newFile = this.publicFilesRepository.create({
      key: filename,
      data: dataBuffer,
    });

    return this.publicFilesRepository.save(newFile);
  }

  async saveFile(dataBuffer: Buffer, filename: string) {
    if (process.env.NODE_ENV === 'dev') {
      return this.saveFileToDB(dataBuffer, filename);
    }

    return this.saveFileToS3(dataBuffer, filename);
  }

  async saveItemImage(dataBuffer: Buffer, filename: string, item: Item) {
    if (process.env.NODE_ENV === 'dev') {
      const newImage = this.publicFilesRepository.create({
        key: filename,
        data: dataBuffer,
        item,
      });

      return this.publicFilesRepository.save(newImage);
    }

    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Body: dataBuffer,
        Key: `${uuid()}-${filename}`,
      })
      .promise();

    const newImage = this.publicFilesRepository.create({
      key: uploadResult.Key,
      url: uploadResult.Location,
      item,
    });

    return this.publicFilesRepository.save(newImage);
  }
}
