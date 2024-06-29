import { EntityRepository } from 'typeorm';
import { classToPlain, plainToClass } from 'class-transformer';

import { BaseRepository } from '../base/base.repository';

import { User } from './entities/user.entity';
import {
  allUserGroupsForSerializing,
  UserEntity,
} from './serializers/users.serializer';

@EntityRepository(User)
export class UsersRepository extends BaseRepository<User, UserEntity> {
  transform(model: User): UserEntity {
    const transformOptions = {
      groups: allUserGroupsForSerializing,
    };

    return plainToClass(
      UserEntity,
      classToPlain(model, transformOptions),
      transformOptions,
    );
  }

  async getByEmail(email: string, relations: string[] = []) {
    try {
      const user = await this.findOne({
        where: { email },
        relations,
      });

      return Promise.resolve(user ? this.transform(user) : null);
    } catch (error) {
      Promise.reject(error);
    }
  }

  async findByProvider(provider: string, providerId: string) {
    try {
      const user = await this.findOne({
        where: { provider, providerId },
      });

      return user ? this.transform(user) : null;
    } catch (error) {
      throw error;
    }
  }
}
