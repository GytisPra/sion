import { Expose } from 'class-transformer';

import { BaseEntity } from '../../base/base.serializer';

import { Role, Level } from '../../enums';

import { Auction } from '../../auctions/auction.entity';
import { Item } from '../../items/item.entity';
import { Bid } from '../../bids/bid.entity';
import { Notification } from '../../notifications/notification.entity';
import { Comment } from '../../comments/comment.entity';
import { UserImage } from '../../files/userImage.entity';

import { IUser } from '../interfaces/users.interface';

export const defaultUserGroupsForSerializing: string[] = ['user.timestamps'];

export const extendedUserGroupsForSerializing: string[] = [
  ...defaultUserGroupsForSerializing,
  'user.verification',
];

export const allUserGroupsForSerializing: string[] = [
  ...extendedUserGroupsForSerializing,
  'user.password',
  'user.authentication',
  'user.verification',
];

export class UserEntity extends BaseEntity implements IUser {
  email: string;
  username: string | null;
  firstname: string | null;
  lastname: string | null;
  karmaPoints: number;
  phone: string | null;
  roles: Role[];
  level: Level | null;
  isVerified: boolean;
  isResetPasswordStarted: boolean;
  items: Item[];
  bids: Bid[];
  notifications: Notification[];
  comments: Comment[];
  auctionsWon: Auction[];
  auctions: Auction[];
  userImages: UserImage[];
  provider: string | null;
  providerId: string | null;

  @Expose({ groups: ['user.password'] })
  password: string;

  @Expose({ groups: ['user.timestamps'] })
  createdAt: Date;

  @Expose({ groups: ['user.timestamps'] })
  updatedAt: Date;

  @Expose({ groups: ['user.authentication'] })
  currentHashedRefreshToken: string | null;

  @Expose({ groups: ['user.verification'] })
  verificationSentAt: Date;

  @Expose({ groups: ['user.verification'] })
  verifiedAt: Date | null;
}
