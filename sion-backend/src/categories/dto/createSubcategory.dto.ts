import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSubcategoryDto {
  @IsString()
  @ApiProperty({
    description: 'Parent category id',
    type: Number,
    required: true,
  })
  categoryId: string;

  @IsString()
  @ApiProperty({
    description: 'Title of subCategory',
    type: String,
    required: true,
  })
  title: string;
}
