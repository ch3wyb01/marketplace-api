import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ICategoriesRepository } from 'src/Domain/categories/ICategoriesRepository';
import { Model } from 'mongoose';
import { Category } from './category.schema';

@Injectable()
export class CategoriesRepository implements ICategoriesRepository {
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: Model<Category>,
  ) {}

  async fetchAllCategories(): Promise<Category[]> {
    const categories = await this.categoryModel.find();
    return categories;
  }

  async insertCategory({
    category_name,
    category_description,
  }): Promise<Category> {
    const category = await this.categoryModel.create({
      category_name,
      category_description,
    });
    return category;
  }
}
