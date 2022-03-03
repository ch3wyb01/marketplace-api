import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from 'src/Domain/categories/categories.service';
import { CategoryMapper } from 'src/Utilities/mappers/category.mapper';
import { CategoryDTO } from './category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getAllCategories(): Promise<{ categories: CategoryDTO[] }> {
    const dbCategories = await this.categoriesService.fetchAllCategories();
    const categories = dbCategories.map(CategoryMapper);
    return { categories };
  }

  @Post()
  async addCategory(
    @Body()
    completeBody: {
      category_name: string;
      category_description: string;
    },
  ): Promise<{ category: CategoryDTO }> {
    const dbCategory = await this.categoriesService.insertCategory(
      completeBody,
    );
    const category = CategoryMapper(dbCategory);
    return { category };
  }
}
