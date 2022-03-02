export class ProductDTO {
  id: string;
  title: string;
  description: string;
  price: number;

  constructor(id: string, title: string, description: string, price: number) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
  }
}
