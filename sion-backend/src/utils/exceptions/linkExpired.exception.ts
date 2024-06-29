import { HttpException, HttpStatus } from '@nestjs/common';

import { LINK_HAS_EXPIRED } from '.';

export class LinkExpired extends HttpException {
  constructor(expiresAt: Date) {
    super(
      LINK_HAS_EXPIRED({
        expiresAt,
      }),
      HttpStatus.BAD_REQUEST,
    );
  }
}
