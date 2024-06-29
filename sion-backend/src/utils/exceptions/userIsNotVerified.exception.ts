import { HttpException, HttpStatus } from '@nestjs/common';

import { USER_IS_NOT_VERIFIED } from '.';

export class UserIsNotVerified extends HttpException {
  constructor() {
    super(USER_IS_NOT_VERIFIED(), HttpStatus.BAD_REQUEST);
  }
}
