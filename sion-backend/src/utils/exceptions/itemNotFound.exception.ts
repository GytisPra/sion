import { HttpException, HttpStatus } from '@nestjs/common';

import { NO_ENTRIES_FOUND } from '.';

export class ItemNotFound extends HttpException {
  constructor(itemId: number) {
    super(NO_ENTRIES_FOUND({ itemId }), HttpStatus.NOT_FOUND);
  }
}
