import { Product } from 'src/db/schemas/product.schema';
import { ProductDTO } from './product.dto';

export const ProductMapper = (product: Product): ProductDTO => {
  return new ProductDTO(
    product._id,
    product.title,
    product.description,
    product.price,
  );
};
