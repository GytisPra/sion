import { MigrationInterface, QueryRunner } from 'typeorm';

import { CategoriesTypes } from '../enums';
import { Category } from '../categories/category.entity';

export class CategoriesSeed1659024625043 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const categoriesRepository =
      queryRunner.manager.getRepository<Category>('category');

    const categoryGroup = await categoriesRepository.save({
      title: 'categoryGroup1',
      type: CategoriesTypes.CATEGORY_GROUP,
    });

    const category = await categoriesRepository.save({
      title: 'category1',
      parentCategory: categoryGroup,
      type: CategoriesTypes.CATEGORY,
    });

    await categoriesRepository.save({
      title: 'subcategory1',
      parentCategory: category,
      type: CategoriesTypes.SUBCATEGORY,
    });
  }

  public async down(): Promise<void> {
    return;
  }
}
