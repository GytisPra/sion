import { HttpException, HttpStatus } from '@nestjs/common';

import { POSSIBLE_BIDS_NUMBER_NOT_FOUND } from '.';

export class PossibleBidsNumberNotFound extends HttpException {
  constructor() {
    super(POSSIBLE_BIDS_NUMBER_NOT_FOUND(), HttpStatus.BAD_REQUEST);
  }
}
