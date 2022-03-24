export interface IProductQuery {
  title?: string;
  priceMin?: number;
  priceMax?: number;
  category?: string;
  sort?: 'title' | 'price';
  order?: 'asc' | 'desc';
}
