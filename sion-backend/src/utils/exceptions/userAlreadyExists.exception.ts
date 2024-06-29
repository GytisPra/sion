import { HttpException, HttpStatus } from '@nestjs/common';

import { DUPLICATE_ENTRY } from '.';

export class UserAlreadyExists extends HttpException {
  constructor(email: string) {
    super(
      DUPLICATE_ENTRY({
        email,
        message: 'User with that email already exists.',
      }),
      HttpStatus.BAD_REQUEST,
    );
  }
}
