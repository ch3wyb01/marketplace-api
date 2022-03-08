import { IProduct } from '../../Domain/products/IProduct';
import { ProductDTO } from '../../API/products/product.dto';

export const ProductMapper = (product: IProduct): ProductDTO => {
  return new ProductDTO(
    product._id,
    product.title,
    product.description,
    product.img_url,
    product.price,
    product.categories,
  );
};
