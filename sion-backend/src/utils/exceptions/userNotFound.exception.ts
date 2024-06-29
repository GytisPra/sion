import { HttpException, HttpStatus } from '@nestjs/common';

import { USER_NOT_FOUND } from '.';

export class UserNotFound extends HttpException {
  constructor(email?: string) {
    super(
      USER_NOT_FOUND({
        email,
      }),
      HttpStatus.NOT_FOUND,
    );
  }
}
