import { Injectable } from '@nestjs/common';
import { CategoryNameMapper } from '../../Utilities/mappers/categoryName.mapper';
import { ProductsRepository } from '../../Persistence/products/products.repository';
import { IProduct } from './IProduct';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async insertProduct(body: IProduct): Promise<IProduct> {
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
    updatedFields: Partial<IProduct>,
  ): Promise<IProduct> {
    const product: IProduct = await this.productsRepository.updateProductById(
      prodId,
      updatedFields,
    );

    const categoryNames: string[] = CategoryNameMapper(product.categories);
    product.categories = categoryNames;

    return product;
  }

  async removeProductById(prodId: string) {
    await this.productsRepository.removeProductById(prodId);
  }
}
