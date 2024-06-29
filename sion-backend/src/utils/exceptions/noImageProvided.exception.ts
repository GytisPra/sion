import { HttpException, HttpStatus } from '@nestjs/common';

import { NO_IMAGE_PROVIDED } from '.';

export class NoImageProvided extends HttpException {
  constructor() {
    super(NO_IMAGE_PROVIDED(), HttpStatus.BAD_REQUEST);
  }
}
