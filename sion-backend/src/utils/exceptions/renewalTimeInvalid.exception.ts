import { HttpException, HttpStatus } from '@nestjs/common';

import { RENEWAL_TIME_INVALID } from '.';

export class RenewalTimeInvalid extends HttpException {
  constructor(auctionEndDate: Date, currentDate: Date) {
    super(
      RENEWAL_TIME_INVALID({ auctionEndDate, currentDate }),
      HttpStatus.BAD_REQUEST,
    );
  }
}
