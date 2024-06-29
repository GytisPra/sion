import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBidDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Id of auction that bid is being placed on',
    type: String,
    required: true,
  })
  auctionId: string;
}
