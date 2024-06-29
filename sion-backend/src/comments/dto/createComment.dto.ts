import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class createCommentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Id of auction that comment is being placed on',
    type: String,
    required: true,
  })
  auctionId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The comment',
    required: true,
  })
  comment: string;
}
