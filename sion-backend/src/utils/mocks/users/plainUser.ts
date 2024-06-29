import { faker } from '@faker-js/faker';

import { Level } from '../../../enums/levels.enum';
import { UserEntity } from '../../../users/serializers/users.serializer';

export const plainUser: UserEntity = {
  id: faker.datatype.uuid(),
  userImages: [],
  items: [],
  bids: [],
  auctions: [],
  auctionsWon: [],
  email: 'tomasjon13@gmail.com',
  firstname: 'Tomas',
  lastname: 'Jonauskas',
  username: 'Tomfsafas',
  password: 'ffsafcfsaf',
  karmaPoints: 20,
  phone: '+866666666',
  dateOfBirth: '2000-09-18',
  roles: [],
  notifications: [],
  level: Level.Zero,
  comments: [],
  isVerified: true,
  verificationSentAt: new Date(),
  verifiedAt: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
  isResetPasswordStarted: false,
  provider: null,
  providerId: null,
  currentHashedRefreshToken: null,
};
