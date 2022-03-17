import { Category } from '../../Persistence/categories/category.schema';
import { ICategory } from './ICategory';

export interface ICategoriesRepository {
  fetchAllCategories(): Promise<Category[]>;

  insertCategory(body: Partial<ICategory>): Promise<Category>;

  fetchCategoryById(catId: string): Promise<ICategory>;
}
