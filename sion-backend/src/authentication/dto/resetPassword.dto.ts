import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @ApiProperty({
    description: 'The users password',
    required: true,
    minLength: 8,
  })
  password: string;
}
