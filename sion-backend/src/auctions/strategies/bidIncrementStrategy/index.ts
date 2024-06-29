import { Auction } from '../../auction.entity';

export interface Strategy {
  getBidIncrement: (auction: Auction) => number;
}

export class BidIncrementContext {
  private strategy: Strategy;

  private setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }

  public getBidIncrement(auction: Auction) {
    return this.strategy.getBidIncrement(auction);
  }
}
