export class ProductDTO {
  id: string;
  title: string;
  description: string;
  img_url: string;
  price: number;
  categories: string[];

  constructor(
    id: string,
    title: string,
    description: string,
    img_url: string,
    price: number,
    categories: string[],
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.img_url = img_url;
    this.price = price;
    this.categories = categories;
  }
}
