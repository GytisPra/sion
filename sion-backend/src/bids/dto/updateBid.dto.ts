import { ApiProperty } from '@nestjs/swagger';

export class UpdateBidDto {
  @ApiProperty({
    description: 'The value of bid',
    type: Number,
  })
  value: number;

  @ApiProperty({
    description: 'Id of item that bid is being placed on',
    type: Number,
  })
  itemId: number;
}
