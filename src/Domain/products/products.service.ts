import { Injectable } from '@nestjs/common';
import { CategoryNameMapper } from '../../Utilities/mappers/categoryName.mapper';
import { ProductsRepository } from '../../Persistence/products/products.repository';
import { Product } from '../../Persistence/products/product.schema';
import { IProduct } from './IProduct';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async insertProduct(body: {
    title: string;
    description: string;
    price: number;
    categories: string[];
  }): Promise<IProduct> {
    const product: IProduct = await this.productsRepository.insertProduct(body);

    const categoryNames: string[] = CategoryNameMapper(product.categories);
    product.categories = categoryNames;

    return product;
  }

  async fetchAllProducts(): Promise<IProduct[]> {
    const products: IProduct[] =
      await this.productsRepository.fetchAllProducts();

    products.forEach((product) => {
      product.categories = CategoryNameMapper(product.categories);
    });
    return products;
  }

  async fetchProductById(prodId: string): Promise<IProduct> {
    const product: IProduct = await this.productsRepository.fetchProductById(
      prodId,
    );

    const categoryNames: string[] = CategoryNameMapper(product.categories);
    product.categories = categoryNames;

    return product;
  }

  async updateProductById(
    prodId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const inputtedFields = [
      ['title', title],
      ['description', description],
      ['price', price],
    ].filter((field) => field[1]);

    const updatedFields = Object.fromEntries(inputtedFields);

    const product = await this.productsRepository.updateProductById(
      prodId,
      updatedFields,
    );
    return product;
  }

  async removeProductById(prodId: string) {
    await this.productsRepository.removeProductById(prodId);
  }
}
