import { HttpException, HttpStatus } from '@nestjs/common';

import { WRONG_CREDENTIALS } from '.';

export class WrongCredentials extends HttpException {
  constructor() {
    super(WRONG_CREDENTIALS(), HttpStatus.UNAUTHORIZED);
  }
}
