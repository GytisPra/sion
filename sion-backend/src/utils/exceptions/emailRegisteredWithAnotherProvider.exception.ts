import { HttpException, HttpStatus } from '@nestjs/common';

import { EMAIL_REGISTERED_WITH_ANOTHER_PROVIDER } from '.';

export class EmailRegisteredWithAnotherProvider extends HttpException {
  constructor(email: string, provider: string) {
    super(
      EMAIL_REGISTERED_WITH_ANOTHER_PROVIDER({ email, provider }),
      HttpStatus.BAD_REQUEST,
    );
  }
}
