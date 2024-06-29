import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description:
      "The user's username which will be displayed for everybody to see",
    required: true,
  })
  username?: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: "The user's email address", required: true })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: "The user's first name", required: true })
  firstname: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: "The user's last name", required: true })
  lastname: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @ApiProperty({
    description: "The user's password",
    required: true,
    minLength: 8,
  })
  password: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @ApiProperty({
    description: 'Birht date of the user',
    type: Date,
  })
  dateOfBirth?: Date;

  @IsOptional()
  @IsMobilePhone()
  @ApiProperty({ description: "The user's phone number", required: false })
  phone?: string;
}
