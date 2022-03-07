import { ICategory } from 'src/Domain/categories/ICategory';
import { CategoryDTO } from '../../API/categories/category.dto';

export const CategoryMapper = (category: ICategory): CategoryDTO => {
  return new CategoryDTO(category.id, category.category_name, category.category_description);
};
