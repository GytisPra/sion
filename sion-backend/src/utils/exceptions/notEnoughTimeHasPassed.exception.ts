import { HttpException, HttpStatus } from '@nestjs/common';

import { NOT_ENOUGH_TIME_HAS_PASSED } from '.';

export class NotEnoughTimeHasPassed extends HttpException {
  constructor(timeToPass: number) {
    super(NOT_ENOUGH_TIME_HAS_PASSED({ timeToPass }), HttpStatus.BAD_REQUEST);
  }
}
