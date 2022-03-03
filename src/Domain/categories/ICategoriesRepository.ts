import { Category } from 'src/Persistence/categories/category.schema';

export interface ICategoriesRepository {
  fetchAllCategories(): Promise<Category[]>;

  insertCategory(body: {
    category_name: string;
    category_description: string;
  }): Promise<Category>;
}
