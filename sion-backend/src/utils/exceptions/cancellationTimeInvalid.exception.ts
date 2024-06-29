import { HttpException, HttpStatus } from '@nestjs/common';

import { CANCELLATION_TIME_INVALID } from '.';

export class CancellationTimeInvalid extends HttpException {
  constructor(auctionEndDate: Date, currentDate: Date) {
    super(
      CANCELLATION_TIME_INVALID({ auctionEndDate, currentDate }),
      HttpStatus.BAD_REQUEST,
    );
  }
}
