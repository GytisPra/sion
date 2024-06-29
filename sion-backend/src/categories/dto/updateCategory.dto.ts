import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class updateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Parent categoryGroup id',
    type: Number,
    required: true,
  })
  categoryGroupId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Title of category',
    type: String,
    required: true,
  })
  title: string;
}
