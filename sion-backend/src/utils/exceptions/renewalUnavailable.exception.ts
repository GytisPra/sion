import { HttpException, HttpStatus } from '@nestjs/common';
import { UserEntity } from '../../users/serializers/users.serializer';

import { RENEWAL_UNAVAILABLE } from '.';

export class RenewalUnavailable extends HttpException {
  constructor(bidsPlaced: number, soldToUser: UserEntity) {
    super(
      RENEWAL_UNAVAILABLE({ bidsPlaced, soldToUser }),
      HttpStatus.BAD_REQUEST,
    );
  }
}
