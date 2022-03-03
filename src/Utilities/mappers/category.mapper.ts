import { CategoryDTO } from 'src/API/categories/category.dto';
import { Category } from 'src/Persistence/categories/category.schema';

export const CategoryMapper = (category: Category): CategoryDTO => {
  return new CategoryDTO(category.category_name, category.category_description);
};
