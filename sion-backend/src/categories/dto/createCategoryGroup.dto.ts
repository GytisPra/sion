import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryGroupDto {
  @IsString()
  @ApiProperty({
    description: 'Title of category group',
    type: String,
    required: true,
  })
  title: string;
}
