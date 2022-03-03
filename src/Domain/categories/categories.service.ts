import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from '../../Persistence/categories/categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async fetchAllCategories() {
    const categories = await this.categoriesRepository.fetchAllCategories();
    return categories;
  }

  async insertCategory(body: {
    category_name: string;
    category_description: string;
  }) {
    const category = await this.categoriesRepository.insertCategory(body);
    return category;
  }
}
