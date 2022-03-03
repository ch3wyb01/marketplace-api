import { Product } from 'src/Persistence/products/product.schema';
import { ProductDTO } from '../API/products/product.dto';

export const ProductMapper = (product: Product): ProductDTO => {
  return new ProductDTO(
    product._id,
    product.title,
    product.description,
    product.price,
  );
};
