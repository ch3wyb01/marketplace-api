import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../../Persistence/products/products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async insertProduct(
    body: {
      title: string;
      description: string;
      price: number;
    },
  ) {
    const product = await this.productsRepository.insertProduct(body);
    return product;
  }

  async fetchAllProducts() {
    const products = await this.productsRepository.fetchAllProducts();
    return products;
  }

  async fetchProductById(prodId: string) {
    const product = await this.productsRepository.fetchProductById(prodId);
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
