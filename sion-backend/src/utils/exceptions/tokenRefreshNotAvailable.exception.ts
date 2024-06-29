import { HttpException, HttpStatus } from '@nestjs/common';

import { TOKEN_REFRESH_NOT_AVAILABLE } from '.';

export class TokenRefreshNotAvailable extends HttpException {
  constructor(message?: string) {
    super(TOKEN_REFRESH_NOT_AVAILABLE(message), HttpStatus.BAD_REQUEST);
  }
}
