import { HttpException, HttpStatus } from '@nestjs/common';

import { ITEM_IS_SOLD } from '.';

export class ItemIsSold extends HttpException {
  constructor(itemId: number) {
    super(ITEM_IS_SOLD({ itemId }), HttpStatus.BAD_REQUEST);
  }
}
