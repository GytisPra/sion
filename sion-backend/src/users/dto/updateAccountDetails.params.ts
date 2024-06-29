import { IsUUID } from 'class-validator';

export class UpdateAccountDetailsParams {
  @IsUUID()
  userId: string;
}
