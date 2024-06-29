import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description:
      'The users username which will be displayed for everybody to see',
    required: true,
  })
  username?: string;

  @IsEmail()
  @ApiProperty({ description: 'The users email address', required: true })
  email: string;

  @IsString()
  @ApiProperty({ description: 'The users first name', required: true })
  firstname: string;

  @IsString()
  @ApiProperty({ description: 'The users last name', required: true })
  lastname: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({
    description: 'The users password',
    required: true,
    minLength: 8,
  })
  password: string;

  @IsOptional()
  @IsPhoneNumber()
  @ApiProperty({ description: 'The users phone number', required: false })
  phone?: string;

  @IsOptional()
  @IsDate()
  @ApiProperty({
    description: 'Birht date of the user',
    type: Date,
  })
  dateOfBirth?: Date;

  @IsOptional()
  @IsString()
  provider?: string;

  @IsOptional()
  @IsString()
  providerId?: string;

  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;
}
