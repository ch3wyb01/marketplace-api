import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProductsRepository } from '../../Domain/products/IProductsRepository';
import { Product } from './product.schema';

@Injectable()
export class ProductsRepository implements IProductsRepository {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<Product>,
  ) {}

  async insertProduct({ title, description, price }): Promise<Product> {
    const product = await this.productModel.create({
      title,
      description,
      price,
    });
    return product;
  }

  async fetchAllProducts(): Promise<Product[]> {
    const products = await this.productModel
      .find()
      .populate({ path: 'categories' })
      .lean() as Product[];
    console.log(products);
    return products;
  }

  async fetchProductById(prodId: string): Promise<Product> {
    const product: Product = await this.productModel
      .findById(prodId)
      .populate({ path: 'categories' })
      .lean();
    return product;
  }

  async updateProductById(
    prodId: string,
    updatedFields: {
      title?: string;
      description?: string;
      price?: number;
    },
  ): Promise<Product> {
    const product = await this.productModel.findByIdAndUpdate(
      { _id: prodId },
      updatedFields,
      { returnDocument: 'after' },
    );

    return product;
  }

  async removeProductById(prodId: string) {
    await this.productModel.findByIdAndDelete(prodId);
  }
}
