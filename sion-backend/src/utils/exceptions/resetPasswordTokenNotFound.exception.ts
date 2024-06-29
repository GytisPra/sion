import { HttpException, HttpStatus } from '@nestjs/common';

import { NO_ENTRIES_FOUND } from '.';

export class ResetPasswordTokenNotFound extends HttpException {
  constructor(resetPasswordToken: string) {
    super(
      NO_ENTRIES_FOUND({
        resetPasswordToken,
      }),
      HttpStatus.BAD_REQUEST,
    );
  }
}
