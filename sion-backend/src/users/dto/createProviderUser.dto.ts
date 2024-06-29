import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateProviderUserDto {
  @IsEmail()
  @ApiProperty({ description: 'The users email address', required: true })
  email: string;

  @IsOptional()
  @IsString()
  provider?: string;

  @IsOptional()
  @IsString()
  providerId?: string;

  @IsOptional()
  @IsBoolean()
  isVerified: boolean;
}
