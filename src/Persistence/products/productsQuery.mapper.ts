import { IProductQuery } from '../../Domain/products/IProductQuery';
import { DBProductQuery } from './DBProductQuery';

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

const titleMapper = (title: string): RegExp => {
  const titleQuery = new RegExp(title, 'gi');

  return titleQuery;
};

export const ProductQueryMapper = (query: IProductQuery): DBProductQuery => {
  const { category, priceMin, priceMax, title } = query;

  const formattedQuery: DBProductQuery = {};

  if (category) formattedQuery.categories = category;

  if (priceMin || priceMax)
    formattedQuery.price = priceMapper(priceMin, priceMax);

  if (title) formattedQuery.title = titleMapper(title);

  return formattedQuery;
};
