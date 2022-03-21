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

  async insertCategory(body: ICategory) {
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

  async updateProductById(
    catId: string,
    updatedFields: Partial<ICategory>,
  ): Promise<ICategory> {
    const category: ICategory =
      await this.categoriesRepository.updateCategoryById(catId, updatedFields);

    return category;
  }

  async removeCategoryById(catId: string) {
    await this.categoriesRepository.removeCategoryById(catId);
  }

  async fetchCategoryByName(name: string): Promise<ICategory> {
    const category: ICategory =
      await this.categoriesRepository.fetchCategoryByName(name);

    return category;
  }
}
