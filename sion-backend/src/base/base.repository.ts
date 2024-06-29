import { plainToClass } from 'class-transformer';
import { Repository, DeepPartial } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { BaseEntity } from './base.serializer';

export class BaseRepository<
  T extends BaseEntity,
  K extends BaseEntity,
> extends Repository<T> {
  async get(id: string, relations: string[] = []): Promise<K | null> {
    try {
      const entity = await this.findOne({
        where: { id },
        relations,
      });

      return Promise.resolve(entity ? this.transform(entity) : null);
    } catch (error) {
      Promise.reject(error);
    }
  }
  async createEntity(
    inputs: DeepPartial<T>,
    relations: string[] = [],
  ): Promise<K> {
    try {
      const newEntity = await this.save(inputs);
      const entity = await this.get(newEntity.id, relations);
      return entity;
    } catch (error) {
      Promise.reject(error);
    }
  }
  async updateEntity(
    entity: K,
    inputs: QueryDeepPartialEntity<T>,
    relations: string[] = [],
  ): Promise<K> {
    try {
      await this.update(entity.id, inputs);
      const newEntity = await this.get(entity.id, relations);

      return newEntity;
    } catch (error) {
      Promise.reject(error);
    }
  }

  transform(model: T, transformOptions = {}): K {
    return plainToClass(BaseEntity, model, transformOptions) as K;
  }

  transformMany(models: T[], transformOptions = {}): K[] {
    return models.map((model) => this.transform(model, transformOptions));
  }
}
