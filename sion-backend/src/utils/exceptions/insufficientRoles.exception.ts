import { HttpException, HttpStatus } from '@nestjs/common';
import { Role } from '../../enums/role.enum';

import { INSUFFICIENT_ROLES } from '.';

export class InsuffiecientRoles extends HttpException {
  constructor(requiredRoles: Role[], userRoles: Role[]) {
    super(
      INSUFFICIENT_ROLES({ requiredRoles, userRoles }),
      HttpStatus.FORBIDDEN,
    );
  }
}
