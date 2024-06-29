import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';

import { NoEntriesFound } from '../utils/exceptions/bidNotFound.exception';
import { CategoriesTypes } from '../enums';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { CreateCategoryGroupDto } from './dto/createCategoryGroup.dto';
import { CreateSubcategoryDto } from './dto/createSubcategory.dto';
import { updateCategoryDto } from './dto/updateCategory.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: TreeRepository<Category>,
  ) {}

  public async createCategoryGroup(
    createCategoryGroupBody: CreateCategoryGroupDto,
  ) {
    const newCategoryGroup = this.categoryRepository.create({
      ...createCategoryGroupBody,
      type: CategoriesTypes.CATEGORY_GROUP,
    });

    await this.categoryRepository.save(newCategoryGroup);

    return newCategoryGroup;
  }

  public async createCategory(createCategoryBody: CreateCategoryDto) {
    const parentCategory = await this.getCategoryById(
      createCategoryBody.categoryGroupId,
    );

    const newCategory = this.categoryRepository.create({
      ...createCategoryBody,
      parentCategory,
      type: CategoriesTypes.CATEGORY,
    });

    await this.categoryRepository.save(newCategory);

    return newCategory;
  }

  public async createSubcategory(createSubcategoryBody: CreateSubcategoryDto) {
    const parentCategory = await this.getCategoryById(
      createSubcategoryBody.categoryId,
    );

    const newSubcategory = this.categoryRepository.create({
      ...createSubcategoryBody,
      parentCategory,
      type: CategoriesTypes.SUBCATEGORY,
    });

    await this.categoryRepository.save(newSubcategory);

    return newSubcategory;
  }

  async getCategoryById(id: string) {
    const category = await this.categoryRepository.findOne(id);

    if (!category) {
      throw new NoEntriesFound(id, 'No category found.');
    }

    return category;
  }

  async getCategoryGroups() {
    return this.categoryRepository
      .createQueryBuilder('category')
      .where('category.type = :type', { type: CategoriesTypes.CATEGORY_GROUP })
      .getMany();
  }

  async getCategories() {
    return this.categoryRepository
      .createQueryBuilder('category')
      .where('category.type = :type', { type: CategoriesTypes.CATEGORY })
      .getMany();
  }

  async getSubcategories() {
    return this.categoryRepository
      .createQueryBuilder('category')
      .where('category.type = :type', { type: CategoriesTypes.SUBCATEGORY })
      .getMany();
  }

  async updateCategory(id: string, updateCategoryBody: updateCategoryDto) {
    const category = await this.categoryRepository.findOne(id);

    if (!category) {
      throw new NoEntriesFound(id);
    }
    await this.categoryRepository.update(id, updateCategoryBody);

    return await this.categoryRepository.findOne(id);
  }

  public async getCategoriesBranch(id: string) {
    const categoryGroup = await this.getCategoryById(id);
    const branch = await this.categoryRepository.findDescendantsTree(
      categoryGroup,
    );

    return branch;
  }

  public async getCategoryAncestors(id: string) {
    const category = await this.getCategoryById(id);

    return this.categoryRepository.findAncestorsTree(category);
  }
}
