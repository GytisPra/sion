import { IsPhoneNumber, IsString } from 'class-validator';

export class UpdateAccountDetailsDto {
  @IsString()
  username: string;

  @IsPhoneNumber()
  phone: string;
}
