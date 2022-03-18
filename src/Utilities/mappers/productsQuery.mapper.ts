import { ProductQuery } from '../../API/products/ProductQuery';
import { DBProductQuery } from '../DBProductQuery';

const priceMapper = (priceMin: number, priceMax: number): object => {
  const priceQueries = { price: {} };
  if (priceMin && priceMax) {
    priceQueries.price = { $gte: Number(priceMin), $lte: Number(priceMax) };
  } else if (priceMin) {
    priceQueries.price = { $gte: Number(priceMin) };
  } else if (priceMax) {
    priceQueries.price = { $lte: Number(priceMax) };
  }

  return priceQueries.price;
};

export const ProductQueryMapper = (query: ProductQuery): DBProductQuery => {
  const { title, category, priceMin, priceMax } = query;

  const formattedQuery: DBProductQuery = {};

  if (priceMin || priceMax) {
    formattedQuery.price = priceMapper(priceMin, priceMax);
  }

  if (category) {
    formattedQuery.categories = category;
  }

  if (title) {
    formattedQuery.title = title;
  }

  return formattedQuery;
};