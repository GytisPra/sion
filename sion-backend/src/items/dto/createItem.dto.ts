import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateItemDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The category group id',
    required: true,
  })
  categoryGroup: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The category id',
    required: true,
  })
  category: string;

  @IsString()
  @IsNotEmpty()
  brand: string;
}
