import { Auction } from '../../auction.entity';

import { Strategy } from './index';

interface Rule {
  a: number;
  b: number;
  duration?: number;
}

export class DefaultAuctionStrategy implements Strategy {
  private defaultRule: Rule = { a: 1.02, b: 0.5 };

  private bidIncrementRules: Rule[] = [
    { a: 1.045, b: 0.5, duration: 5 * 60 * 1000 },
    { a: 1.03, b: 0.5, duration: 2 * 24 * 60 * 60 * 1000 },
    { a: 1.038, b: 0.5, duration: 4 * 60 * 60 * 1000 },
  ];

  private calculateAuctionDuration(auction: Auction) {
    return auction.endDate.getTime() - auction.startDate.getTime();
  }

  private calculateBidIncrement(auction: Auction, rule: Rule) {
    return rule.a * auction.bidIncrement + rule.b;
  }

  public getBidIncrement(auction: Auction) {
    const auctionDuration = this.calculateAuctionDuration(auction);

    for (const rule of this.bidIncrementRules) {
      if (auctionDuration < rule.duration) {
        return this.calculateBidIncrement(auction, rule);
      }
    }

    return this.calculateBidIncrement(auction, this.defaultRule);
  }
}
