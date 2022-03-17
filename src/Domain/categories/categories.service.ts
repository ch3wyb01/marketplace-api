import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from '../../Persistence/categories/categories.repository';
import { ICategory } from './ICategory';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async fetchAllCategories() {
    const categories: ICategory[] =
      await this.categoriesRepository.fetchAllCategories();
    return categories;
  }

  async insertCategory(body: Partial<ICategory>) {
    const category: ICategory = await this.categoriesRepository.insertCategory(
      body,
    );
    return category;
  }

  async fetchCategoryById(catId: string): Promise<ICategory> {
    const category: ICategory =
      await this.categoriesRepository.fetchCategoryById(catId);
    return category;
  }
}
