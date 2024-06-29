import { HttpException, HttpStatus } from '@nestjs/common';

import { AUCTION_NOT_AVAILABLE } from '.';

export class AuctionNotAvailable extends HttpException {
  constructor(date: Date) {
    super(AUCTION_NOT_AVAILABLE({ date }), HttpStatus.BAD_REQUEST);
  }
}
