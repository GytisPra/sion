import { HttpException, HttpStatus } from '@nestjs/common';

import { TWO_SAME_USER_BIDS_IN_A_ROW } from '.';

export class TwoSameUserBidsInARow extends HttpException {
  constructor() {
    super(TWO_SAME_USER_BIDS_IN_A_ROW(), HttpStatus.BAD_REQUEST);
  }
}
