import { Product } from '../../Persistence/products/product.schema';

export interface IProductsRepository {
  insertProduct(body: {
    title: string;
    description: string;
    price: number;
    categories: string[];
  }): Promise<Product>;

  fetchAllProducts(): Promise<Product[]>;

  fetchProductById(prodId: string): Promise<Product>;

  updateProductById(
    prodId: string,
    updatedFields: {
      title?: string;
      description?: string;
      price?: number;
      categories?: string[];
    },
  ): Promise<Product>;

  removeProductById(prodId: string): Promise<void>;
}
