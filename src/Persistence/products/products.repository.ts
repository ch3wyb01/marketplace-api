import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DBProductQuery } from './DBProductQuery';
import { IProduct } from '../../Domain/products/IProduct';
import { IProductsRepository } from '../../Domain/products/IProductsRepository';
import { Product } from './product.schema';
import { IProductQuery } from '../../Domain/products/IProductQuery';
import { ProductQueryMapper } from './productsQuery.mapper';

@Injectable()
export class ProductsRepository implements IProductsRepository {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(body: IProduct): Promise<Product> {
    const newProduct: Product = await this.productModel.create(body);

    const product: Product = await this.productModel
      .findById(newProduct.id)
      .populate({ path: 'categories' })
      .lean();

    return product;
  }

  async fetchAllProducts(query: IProductQuery): Promise<Product[]> {
    const queries: DBProductQuery = ProductQueryMapper(query);

    const products = (await this.productModel
      .find(queries)
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
    updatedFields: Partial<IProduct>,
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
      throw new HttpException(
        "Product not found and couldn't be deleted",
        HttpStatus.NOT_FOUND,
      );
  }
}
