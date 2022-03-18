import { ProductQuery } from '../../API/products/ProductQuery';
import { IProduct } from '../../Domain/products/IProduct';

export const ProductQueryMapper = (query: ProductQuery): Partial<IProduct> => {
  const inputtedQueries = Object.entries(query).filter((field) => field[1]);

  const queries = Object.fromEntries(inputtedQueries);

  if (queries.category) {
    queries.categories = queries.category;
    delete queries.category;
  }

  return queries;
};
