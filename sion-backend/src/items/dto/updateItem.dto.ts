import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateItemDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The brand of an item',
    required: true,
  })
  brand?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The category of an item',
    required: true,
  })
  subcategoryId?: string;
}
