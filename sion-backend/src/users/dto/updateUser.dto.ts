import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(8)
  @ApiProperty({
    description: 'The users password',
    minLength: 8,
  })
  password?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: "User's verification status",
  })
  isVerified?: boolean;

  @IsOptional()
  @IsString()
  currentHashedRefreshToken?: string;

  @IsOptional()
  @IsNumber()
  karmaPoints?: number;
}
