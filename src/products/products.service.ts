import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, description: string, price: number) {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, description, price);
    this.products.push(newProduct);
    return prodId;
  }

  fetchAllProducts() {
    return [...this.products];
  }

  fetchProductById(prodId: string) {
    const product = this.products.find((product) => product.id === prodId);
    if (!product) throw new NotFoundException('Product not found');
    return { ...product };
  }
}
