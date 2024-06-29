import { HttpException, HttpStatus } from '@nestjs/common';

import { RESET_PASSWORD_STARTED } from '.';

export class ResetPasswordStarted extends HttpException {
  constructor(email: string, userId: string) {
    super(RESET_PASSWORD_STARTED({ email, userId }), HttpStatus.BAD_REQUEST);
  }
}
