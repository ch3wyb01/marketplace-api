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
    const product = this.findProduct(prodId)[0];
    return { ...product };
  }

  updateProductById(
    prodId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const [product, index] = this.findProduct(prodId);
    const updatedProduct = { ...product };

    const updatedFields = [{ title }, { description }, { price }].filter(
      (field) => Object.values(field)[0],
    );

    updatedFields.forEach((obj) => {
      const field = Object.keys(obj)[0];
      const value = Object.values(obj)[0];
      updatedProduct[field] = value;
    });

    this.products[index] = updatedProduct;
  }

  removeProductById(prodId: string) {
    const [product, index] = this.findProduct(prodId);
    this.products.splice(index, 1);
  }

  private findProduct(prodId: string): [Product, number] {
    const productIndex = this.products.findIndex(
      (product) => product.id === prodId,
    );
    const product = this.products[productIndex];

    if (!product) throw new NotFoundException('Product not found');

    return [product, productIndex];
  }
}
