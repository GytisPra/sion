import { Request } from 'express';

import { UserEntity } from '../../users/serializers/users.serializer';
export interface RequestWithUser extends Request {
  user: UserEntity;
}
