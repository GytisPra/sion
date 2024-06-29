import { HttpException, HttpStatus } from '@nestjs/common';

import { AUCTION_TIME_INVALID } from '.';

export class AuctionTimeInvalid extends HttpException {
  constructor(date: Date) {
    super(AUCTION_TIME_INVALID({ date }), HttpStatus.BAD_REQUEST);
  }
}
