export class ProductDTO {
  id: string;
  title: string;
  description: string;
  price: number;
  categories: string[];

  constructor(
    id: string,
    title: string,
    description: string,
    price: number,
    categories: string[],
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.categories = categories;
  }
}
