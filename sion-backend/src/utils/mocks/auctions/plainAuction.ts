import { faker } from '@faker-js/faker';
import { plainToClass } from 'class-transformer';

import { Auction } from '../../../auctions/auction.entity';
import { Item } from '../../../items/item.entity';
import { AuctionType } from '../../../enums/auctionType.enum';
import { plainItem } from '../item/plainItem';
import { plainUser } from '../users/plainUser';
import { UserEntity } from '../../../users/serializers/users.serializer';
import { AuctionStatuses } from '../../../enums/auctionStatuses.enum';

export const plainAuction: Auction = {
  id: faker.datatype.uuid(),
  startDate: new Date(Date.now() - 1 * 60 * 60 * 1000),
  initialEndDate: new Date(Date.now() + 1 * 60 * 60 * 1000),
  endDate: new Date(Date.now() + 1 * 60 * 60 * 60 * 1000),
  auctionStatus: AuctionStatuses.ACTIVE,
  auctionType: [AuctionType.buyNow],
  startingPrice: 100,
  soldToUser: null,
  buyNowPrice: 300,
  price: 100,
  bidIncrement: 20,
  grandAuctionStartPrice: 220,
  createdByUser: plainToClass(UserEntity, plainUser),
  createdByUserId: faker.datatype.uuid(),
  bids: [],
  comments: [],
  itemId: 1,
  item: plainToClass(Item, plainItem),
  createdAt: new Date(),
  updatedAt: new Date(),
};
