export enum CategoriesTypes {
  CATEGORY_GROUP = 'CATEGORY_GROUP',
  CATEGORY = 'CATEGORY',
  SUBCATEGORY = 'SUBCATEGORY',
}

interface Category {
  id: string;
  title: string;
  type: CategoriesTypes;
  createdAt: Date;
  updatedAt: Date;
}

export default Category;
