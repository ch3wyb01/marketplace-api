import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/Persistence/products/product.schema';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(
    title: string,
    description: string,
    price: number,
  ): Promise<Product> {
    const newProduct = { title, description, price };
    const product = await this.productModel.create(newProduct);
    return product;
  }

  async fetchAllProducts(): Promise<Product[]> {
    const products = await this.productModel.find().exec();
    return products;
  }

  async fetchProductById(prodId: string): Promise<Product> {
    const product = await this.productModel.findById(prodId);
    return product;
  }

  async updateProductById(
    prodId: string,
    title: string,
    description: string,
    price: number,
  ): Promise<Product> {
    const inputtedFields = [
      ['title', title],
      ['description', description],
      ['price', price],
    ].filter((field) => field[1]);

    const updatedFields = Object.fromEntries(inputtedFields);

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