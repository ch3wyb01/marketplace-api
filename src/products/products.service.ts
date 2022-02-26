import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/db/schemas/product.schema';

@Injectable()
export class ProductsService {
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

  async fetchProductById(prodId: string) {
    const product = await this.productModel.findById(prodId);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  async updateProductById(
    prodId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const fields = [{ title }, { description }, { price }].filter(
      (field) => Object.values(field)[0],
    );

    const updatedFields = {};

    fields.forEach((obj) => {
      const field = Object.keys(obj)[0];
      const value = Object.values(obj)[0];
      updatedFields[field] = value;
    });

    const product = await this.productModel.updateOne(
      { _id: prodId },
      updatedFields,
    );

    return product;
  }

  async removeProductById(prodId: string) {
    await this.productModel.findByIdAndDelete(prodId);
  }
}
