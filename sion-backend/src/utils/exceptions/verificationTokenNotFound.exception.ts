import { HttpException, HttpStatus } from '@nestjs/common';

import { NO_ENTRIES_FOUND } from '.';

export class VerificationTokenNotFound extends HttpException {
  constructor() {
    super(NO_ENTRIES_FOUND(), HttpStatus.BAD_REQUEST);
  }
}
