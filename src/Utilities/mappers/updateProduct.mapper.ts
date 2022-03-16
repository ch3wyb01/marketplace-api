import { UpdateProductDTO } from 'src/API/products/updateProduct.dto';
import { IProduct } from 'src/Domain/products/IProduct';

export const UpdateProductMapper = (
  product: UpdateProductDTO,
): Partial<IProduct> => {
  const { title, description, img_url, price, categories } = product;
  const inputtedFields = [
    ['title', title],
    ['description', description],
    ['img_url', img_url],
    ['price', price],
    ['categories', categories],
  ].filter((field) => field[1]);

  const updatedFields: {
    title?: string;
    description?: string;
    img_url?: string;
    price?: number;
    categories?: string[];
  } = Object.fromEntries(inputtedFields);

  return updatedFields;
};
