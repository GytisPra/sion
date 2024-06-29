import { Level } from '../../enums';

export class EditUserDto {
  karmaPoints?: number;
  level?: Level;
  isVerified?: boolean;
  verifiedAt?: Date;
  currentHashedRefreshToken?: string;
  password?: string;
  isResetPasswordStarted?: boolean;
  username?: string;
  phone?: string;
}
