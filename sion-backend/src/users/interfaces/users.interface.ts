import { Role, Level } from '../../enums';

import { Auction } from '../../auctions/auction.entity';
import { Item } from '../../items/item.entity';
import { Bid } from '../../bids/bid.entity';
import { Notification } from '../../notifications/notification.entity';
import { Comment } from '../../comments/comment.entity';
import { UserImage } from '../../files/userImage.entity';

export interface IUser {
  email: string;
  firstname: string | null;
  lastname: string | null;
  password: string;
  karmaPoints: number;
  phone: string | null;
  roles: Role[];
  level: Level | null;
  isVerified: boolean;
  items: Item[];
  bids: Bid[];
  notifications: Notification[];
  comments: Comment[];
  auctionsWon: Auction[];
  auctions: Auction[];
  userImages: UserImage[];
  currentHashedRefreshToken: string | null;
  isResetPasswordStarted: boolean;
  verificationSentAt: Date;
  verifiedAt: Date | null;
  provider: string | null;
  providerId: string | null;
}
