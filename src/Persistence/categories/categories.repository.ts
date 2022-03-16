import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ICategoriesRepository } from '../../Domain/categories/ICategoriesRepository';
import { Model } from 'mongoose';
import { Category } from './category.schema';
import { ICategory } from '../../Domain/categories/ICategory';

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

  async insertCategory(body: Partial<ICategory>): Promise<Category> {
    const category = await this.categoryModel.create(body);
    return category;
  }
}
