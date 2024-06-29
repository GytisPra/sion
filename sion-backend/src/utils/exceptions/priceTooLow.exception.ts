import { HttpException, HttpStatus } from '@nestjs/common';

import { PRICE_TOO_LOW } from '.';

export class PriceTooLow extends HttpException {
  constructor(startingPrice: number, buyNowPrice: number) {
    super(
      PRICE_TOO_LOW({ startingPrice, buyNowPrice }),
      HttpStatus.BAD_REQUEST,
    );
  }
}
