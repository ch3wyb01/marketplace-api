import { Category } from '../../Persistence/categories/category.schema';
import { ICategory } from './ICategory';

export interface ICategoriesRepository {
  fetchAllCategories(): Promise<Category[]>;

  insertCategory(body: Partial<ICategory>): Promise<Category>;

  fetchCategoryById(catId: string): Promise<ICategory>;

  updateCategoryById(
    catId: string,
    updatedFields: Partial<ICategory>,
  ): Promise<ICategory>;

  removeCategoryById(catId: string): Promise<void>;

  fetchCategoryByName(name: string): Promise<Category>;
}
