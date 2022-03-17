import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ICategory } from 'src/Domain/categories/ICategory';
import { UpdateMapper } from '../../Utilities/mappers/update.mapper';
import { CategoriesService } from '../../Domain/categories/categories.service';
import { CategoryMapper } from '../../Utilities/mappers/category.mapper';
import { CategoryDTO } from './category.dto';
import { NewCategoryDTO } from './newCategory.dto';
import { UpdateCategoryDTO } from './updateCategory.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getAllCategories(): Promise<{ categories: CategoryDTO[] }> {
    const dbCategories: ICategory[] =
      await this.categoriesService.fetchAllCategories();

    const categories: CategoryDTO[] = dbCategories.map(CategoryMapper);
    return { categories };
  }

  @Post()
  async addCategory(
    @Body()
    completeBody: NewCategoryDTO,
  ): Promise<{ category: CategoryDTO }> {
    const dbCategory: ICategory = await this.categoriesService.insertCategory(
      completeBody,
    );

    const category: CategoryDTO = CategoryMapper(dbCategory);
    return { category };
  }

  @Get(':id')
  async getCategoryById(
    @Param('id') catId: string,
  ): Promise<{ category: CategoryDTO }> {
    const dbCategory: ICategory =
      await this.categoriesService.fetchCategoryById(catId);

    const category: CategoryDTO = CategoryMapper(dbCategory);
    return { category };
  }

  @Patch(':id')
  async patchCategoryById(
    @Param('id') catId: string,
    @Body()
    completeBody: UpdateCategoryDTO,
  ): Promise<{ category: CategoryDTO }> {
    const updatedFields: Partial<ICategory> = UpdateMapper(completeBody);

    const dbCategory: ICategory =
      await this.categoriesService.updateProductById(catId, updatedFields);

    const category: CategoryDTO = CategoryMapper(dbCategory);

    return { category };
  }
}
