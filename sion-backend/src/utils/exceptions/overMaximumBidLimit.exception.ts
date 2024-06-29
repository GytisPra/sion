import { HttpException, HttpStatus } from '@nestjs/common';

import { OVER_MAXIMUM_BID_LIMIT } from '.';

export class OverMaximumBidLimit extends HttpException {
  constructor(maximumBids: number) {
    super(OVER_MAXIMUM_BID_LIMIT({ maximumBids }), HttpStatus.BAD_REQUEST);
  }
}
