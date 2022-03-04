import { Category } from 'src/Persistence/categories/category.schema';

export const CategoryNameMapper = (categories: Category[]): string[] => {
  const categoryNames = categories.map((category) => category.category_name);
  return categoryNames;
};
