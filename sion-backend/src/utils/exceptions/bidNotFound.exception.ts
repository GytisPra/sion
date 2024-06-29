import { HttpException, HttpStatus } from '@nestjs/common';

import { NO_ENTRIES_FOUND } from '.';

export class NoEntriesFound extends HttpException {
  constructor(id: number | string, message?: string) {
    super(NO_ENTRIES_FOUND({ id, message }), HttpStatus.NOT_FOUND);
  }
}
