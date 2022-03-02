export class ProductDTO {
  id: string;
  title: string;
  description: string;
  price: number;

  constructor(id, title, description, price) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
  }
}
