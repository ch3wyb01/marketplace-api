import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async insertProduct({
    title,
    description,
    img_url,
    price,
    categories,
  }): Promise<Product> {
    const newProduct: Product = await this.productModel.create({
      title,
      description,
      img_url,
      price,
      categories,
    });

    const product: Product = await this.productModel
      .findById(newProduct.id)
      .populate({ path: 'categories' })
      .lean();

    return product;
  }

  async fetchAllProducts(): Promise<Product[]> {
    const products = (await this.productModel
      .find()
      .populate({ path: 'categories' })
      .lean()) as Product[];

    return products;
  }

  async fetchProductById(prodId: string): Promise<Product> {
    const product: Product = await this.productModel
      .findById(prodId)
      .populate({ path: 'categories' })
      .lean();

    if (product) return product;
    else throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
  }

  async updateProductById(
    prodId: string,
    updatedFields: {
      title?: string;
      description?: string;
      img_url?: string;
      price?: number;
      categories?: string[];
    },
  ): Promise<Product> {
    const product: Product = await this.productModel
      .findByIdAndUpdate({ _id: prodId }, updatedFields, {
        returnDocument: 'after',
      })
      .populate({ path: 'categories' })
      .lean();

    if (product) return product;
    else throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
  }

  async removeProductById(prodId: string) {
    const product = await this.productModel.findByIdAndDelete(prodId);

    if (!product)
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
  }
}
