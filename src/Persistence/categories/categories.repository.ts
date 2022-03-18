import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    const categories: Category[] = await this.categoryModel.find();
    return categories;
  }

  async insertCategory(body: ICategory): Promise<Category> {
    const category: Category = await this.categoryModel.create(body);

    return category;
  }

  async fetchCategoryById(catId: string): Promise<Category> {
    const category: Category = await this.categoryModel.findById(catId).lean();

    if (category) return category;
    else throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
  }

  async updateCategoryById(
    catId: string,
    updatedFields: Partial<ICategory>,
  ): Promise<ICategory> {
    const category: Category = await this.categoryModel
      .findByIdAndUpdate({ _id: catId }, updatedFields, {
        returnDocument: 'after',
      })
      .lean();

    if (category) return category;
    else throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
  }

  async removeCategoryById(catId: string): Promise<void> {
    const category = await this.categoryModel.findByIdAndDelete(catId);

    if (!category)
      throw new HttpException(
        "Category not found and couldn't be deleted",
        HttpStatus.NOT_FOUND,
      );
  }
}
