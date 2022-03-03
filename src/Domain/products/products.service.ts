import { Injectable } from '@nestjs/common';
import { ProductsRepository } from 'src/Persistence/products/products.repository';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
  ) {}

  async insertProduct(body: {
    title: string;
    description: string;
    price: number;
  }) {
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
      
    const product = await this.productsRepository.updateProductById(
      prodId,
      title,
      description,
      price,
    );
    return product;
  }

  async removeProductById(prodId: string) {
    await this.productsRepository.removeProductById(prodId);
  }
}
