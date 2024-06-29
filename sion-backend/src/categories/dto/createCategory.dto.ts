import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @ApiProperty({
    description: 'Parent categoryGroup id',
    type: Number,
    required: true,
  })
  categoryGroupId: string;

  @IsString()
  @ApiProperty({
    description: 'Title of category',
    type: String,
    required: true,
  })
  title: string;
}
