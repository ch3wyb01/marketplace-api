import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from '../../Persistence/categories/categories.repository';
import { ICategory } from './ICategory';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async fetchAllCategories() {
    const categories = await this.categoriesRepository.fetchAllCategories();
    return categories;
  }

  async insertCategory(body: Partial<ICategory>) {
    const category = await this.categoriesRepository.insertCategory(body);
    return category;
  }
}
