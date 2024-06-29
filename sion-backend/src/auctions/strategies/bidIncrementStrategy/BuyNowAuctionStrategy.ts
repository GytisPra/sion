import { Auction } from '../../auction.entity';

import { PossibleBidsNumberNotFound } from '../../../utils/exceptions/possibleBidsNumberNotFound.exception';

import { Strategy } from './index';

export class BuyNowAuctionStrategy implements Strategy {
  private possibleBidsRules = [
    { duration: 4 * 60 * 60 * 1000, bids: 10 },
    { duration: 8 * 60 * 60 * 1000, bids: 15 },
    { duration: 24 * 60 * 60 * 1000, bids: 20 },
    { duration: 3 * 24 * 60 * 60 * 1000, bids: 25 },
    { duration: 7 * 24 * 60 * 60 * 1000, bids: 30 },
    { duration: 2 * 7 * 24 * 60 * 60 * 1000, bids: 40 },
  ];

  private calculateBidIncrement(auction: Auction, possibleBids: number) {
    return (auction.buyNowPrice - auction.startingPrice) / possibleBids;
  }

  private calculateAuctionDuration(auction: Auction) {
    return auction.endDate.getTime() - auction.startDate.getTime();
  }

  public getBidIncrement(auction: Auction) {
    const auctionDuration = this.calculateAuctionDuration(auction);

    for (const rule of this.possibleBidsRules) {
      if (auctionDuration <= rule.duration) {
        return this.calculateBidIncrement(auction, rule.bids);
      }
    }

    throw new PossibleBidsNumberNotFound();
  }
}
