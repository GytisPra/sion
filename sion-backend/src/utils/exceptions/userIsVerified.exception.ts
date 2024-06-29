import { HttpException, HttpStatus } from '@nestjs/common';

import { USER_IS_VERIFIED } from '.';

export class UserIsVerified extends HttpException {
  constructor(email: string) {
    super(
      USER_IS_VERIFIED({
        email,
      }),
      HttpStatus.BAD_REQUEST,
    );
  }
}
