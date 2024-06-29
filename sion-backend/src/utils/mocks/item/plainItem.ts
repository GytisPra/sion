import { plainToClass } from 'class-transformer';
import { faker } from '@faker-js/faker';

import { UserEntity } from '../../../users/serializers/users.serializer';
import { Item } from '../../../items/item.entity';
import { plainUser } from '../users/plainUser';

export const plainItem: Partial<Item> = {
  id: '1',
  images: [],
  user: plainToClass(UserEntity, plainUser),
  brand: 'Test Brand',
  //category: 'Test Category',
  createdAt: null,
  updatedAt: null,
  auction: undefined,
  subcategoryId: faker.datatype.uuid(),
};
