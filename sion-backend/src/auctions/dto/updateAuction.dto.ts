import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsOptional } from 'class-validator';

import { AuctionType } from '../../enums';
import { UserEntity } from '../../users/serializers/users.serializer';

export class UpdateAuctionDto {
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  endDate: Date;

  @IsOptional()
  @IsEnum(AuctionType, { each: true })
  auctionType: AuctionType[];

  @IsOptional()
  @IsNumber()
  startingValue: number;

  @IsOptional()
  @IsNumber()
  buyNowValue: number;

  @IsOptional()
  @IsNumber()
  currentValue: number;

  @IsOptional()
  @IsNumber()
  bidIncrementValue: number;

  @IsOptional()
  @IsNumber()
  grandAuctionStart: number;

  @IsOptional()
  createdByUser: UserEntity;

  @IsOptional()
  @IsNumber()
  itemId: number;
}
