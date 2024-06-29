import { Injectable } from '@nestjs/common';
import { isEqual, sortBy } from 'lodash';

import { AuctionType } from '../../../enums/auctionType.enum';

import { BuyNowAuctionStrategy } from '../../strategies/bidIncrementStrategy/BuyNowAuctionStrategy';
import { DefaultAuctionStrategy } from '../../strategies/bidIncrementStrategy/DefaultAuctionStrategy';

@Injectable()
export class BidIncrementFactory {
  public createBidIncrementStrategy(type: AuctionType[]) {
    // TODO: More strategies should be implemented in the future.
    if (isEqual(sortBy(type), sortBy([AuctionType.buyNow]))) {
      return new BuyNowAuctionStrategy();
    }

    return new DefaultAuctionStrategy();
  }
}
