import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { LoggerService } from 'sion-logger';

import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { CreateCategoryGroupDto } from './dto/createCategoryGroup.dto';
import { CreateSubcategoryDto } from './dto/createSubcategory.dto';
import { updateCategoryDto } from './dto/updateCategory.dto';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private logger: LoggerService,
  ) {
    this.logger.layer = 'CategoriesController';
  }
  @Post('categoryGroup')
  async createCategoryGroup(
    @Body() createCategoryGroupBody: CreateCategoryGroupDto,
  ) {
    this.logger.development.info('Creating category group.', {
      involved: 'create_category_group',
      meta: { body: createCategoryGroupBody },
    });
    return this.categoriesService.createCategoryGroup(createCategoryGroupBody);
  }

  @Post('category')
  async createCategory(@Body() createCategoryBody: CreateCategoryDto) {
    this.logger.development.info('Creating category.', {
      involved: 'create_category',
      meta: { body: createCategoryBody },
    });
    return this.categoriesService.createCategory(createCategoryBody);
  }

  @Post('subcategory')
  async createSubcategory(@Body() createSubcategoryBody: CreateSubcategoryDto) {
    this.logger.development.info('Creating subcategory.', {
      involved: 'create_subcategory',
      meta: { body: createSubcategoryBody },
    });
    return this.categoriesService.createSubcategory(createSubcategoryBody);
  }

  @Get('categoryGroups')
  async getCategoryGroups() {
    this.logger.development.info('Retrieving category groups.', {
      involved: 'get_category_groups',
    });
    return this.categoriesService.getCategoryGroups();
  }

  @Get('categories')
  async getCategories() {
    this.logger.development.info('Retrieving categories.', {
      involved: 'get_categories',
    });
    return this.categoriesService.getCategories();
  }

  @Get('subcategories')
  async getSubcategories() {
    this.logger.development.info('Retrieving subcategories.', {
      involved: 'get_subcategories',
    });
    return this.categoriesService.getSubcategories();
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: string) {
    this.logger.development.info({
      involved: 'get_category',
      meta: { id },
    });
    return this.categoriesService.getCategoryById(id);
  }

  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryBody: updateCategoryDto,
  ) {
    this.logger.development.info({
      involved: 'update_category',
      meta: { id, body: updateCategoryBody },
    });
    return this.categoriesService.updateCategory(id, updateCategoryBody);
  }

  @Get('/branch/:id')
  async getCategoriesBranch(@Param('id') id: string) {
    this.logger.development.info({
      involved: 'get_categories_branch',
      meta: { id },
    });

    return this.categoriesService.getCategoriesBranch(id);
  }

  @Get('/ancestors/:id')
  async getCategoryAncestors(@Param('id') id: string) {
    this.logger.development.info({
      involved: 'get_category_ancestors',
      meta: { id },
    });

    return this.categoriesService.getCategoryAncestors(id);
  }
}
