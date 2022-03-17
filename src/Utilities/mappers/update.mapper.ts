import { UpdateCategoryDTO } from 'src/API/categories/updateCategory.dto';
import { UpdateProductDTO } from 'src/API/products/updateProduct.dto';
import { ICategory } from 'src/Domain/categories/ICategory';
import { IProduct } from 'src/Domain/products/IProduct';

export const UpdateMapper = (
  fields: UpdateProductDTO | UpdateCategoryDTO,
): Partial<IProduct> | Partial<ICategory> => {
  const inputtedFields = Object.entries(fields).filter((field) => field[1]);

  const updatedFields = Object.fromEntries(inputtedFields);

  return updatedFields;
};
