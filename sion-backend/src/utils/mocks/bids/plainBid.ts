import { Auction } from '../../../auctions/auction.entity';
import { plainToClass } from 'class-transformer';
import { UserEntity } from '../../../users/serializers/users.serializer';
import { Bid } from '../../../bids/bid.entity';
import { plainAuction } from '../auctions/plainAuction';
import { plainUser } from '../users/plainUser';

export const plainExpectedBid: Bid = {
  auction: plainToClass(Auction, plainAuction),
  user: plainToClass(UserEntity, plainUser),
  value: 120,
  createdAt: null,
  updatedAt: null,
};
