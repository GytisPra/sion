import { HttpException, HttpStatus } from '@nestjs/common';

import { USER_TOO_YOUNG } from '.';

export class UserTooYoung extends HttpException {
  constructor(date: Date) {
    super(USER_TOO_YOUNG({ date }), HttpStatus.BAD_REQUEST);
  }
}
