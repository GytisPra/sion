import { HttpException, HttpStatus } from '@nestjs/common';

import { DUPLICATE_ENTRY } from '.';

export class ItemHasAuction extends HttpException {
  constructor(itemId: number) {
    super(
      DUPLICATE_ENTRY({ itemId, message: 'Item already has an auction.' }),
      HttpStatus.BAD_REQUEST,
    );
  }
}
