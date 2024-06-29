import { HttpException, HttpStatus } from '@nestjs/common';

import { NOT_ENOUGH_KARMA } from '.';

export class NotEnoughKarmaPoints extends HttpException {
  constructor(karma: number) {
    super(NOT_ENOUGH_KARMA({ karma }), HttpStatus.BAD_REQUEST);
  }
}
