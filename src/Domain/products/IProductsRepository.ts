import { Product } from '../../Persistence/products/product.schema';
import { IProduct } from './IProduct';

export interface IProductsRepository {
  insertProduct(body: IProduct): Promise<Product>;

  fetchAllProducts(): Promise<Product[]>;

  fetchProductById(prodId: string): Promise<Product>;

  updateProductById(
    prodId: string,
    updatedFields: Partial<IProduct>,
  ): Promise<Product>;

  removeProductById(prodId: string): Promise<void>;
}
