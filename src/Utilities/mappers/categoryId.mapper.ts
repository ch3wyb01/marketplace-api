import { ICategory } from 'src/Domain/categories/ICategory';

export const CategoryIDMapper = (category: ICategory) => {
  return category._id;
};
