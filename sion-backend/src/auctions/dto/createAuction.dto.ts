import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Min,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { AuctionType } from '../../enums/auctionType.enum';
import { roundAuctionPrice } from '../../utils/helper/helper';

export class CreateAuctionDto {
  @IsNotEmpty()
  @IsString()
  public title: string;

  @IsNotEmpty()
  @IsUUID()
  public categoryGroup: string;

  @IsNotEmpty()
  @IsUUID()
  public category: string;

  @IsNotEmpty()
  @IsString()
  public description: string;

  @IsNotEmpty()
  @IsString()
  public brand: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => roundAuctionPrice(value))
  @Min(1)
  public startingPrice: number;

  @IsEnum(AuctionType, { each: true })
  @ApiProperty({
    description: 'The type of auction',
    enum: AuctionType,
  })
  auctionType: AuctionType[];

  @IsNotEmpty()
  @ValidateIf(
    (body) => body.auctionType && body.auctionType.includes(AuctionType.buyNow),
  )
  @IsNumber()
  @Transform(({ value }) => roundAuctionPrice(value))
  public buyNowPrice?: number;

  @Type(() => Date)
  @IsDate()
  @ApiProperty({
    description: 'The date of the auction end',
    type: Date,
  })
  endDate: Date;
}
