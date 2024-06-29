import { HttpException, HttpStatus } from '@nestjs/common';

import { NO_ENTRIES_FOUND } from '.';

export class AuctionNotFound extends HttpException {
  constructor(auctionId: string) {
    super(NO_ENTRIES_FOUND({ auctionId }), HttpStatus.NOT_FOUND);
  }
}
