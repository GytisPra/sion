import { HttpException, HttpStatus } from '@nestjs/common';

import { CODE_HAS_EXPIRED } from '.';

export class CodeExpired extends HttpException {
  constructor(expiresAt: Date) {
    super(
      CODE_HAS_EXPIRED({
        expiresAt,
      }),
      HttpStatus.BAD_REQUEST,
    );
  }
}
