import { HttpException, HttpStatus } from '@nestjs/common';
import { UpdateAuctionDto } from '../../auctions/dto/updateAuction.dto';

import { RENEWAL_INVALID } from '.';

export class RenewalInvalid extends HttpException {
  constructor(updateAuctionBody: UpdateAuctionDto) {
    super(RENEWAL_INVALID({ updateAuctionBody }), HttpStatus.BAD_REQUEST);
  }
}
