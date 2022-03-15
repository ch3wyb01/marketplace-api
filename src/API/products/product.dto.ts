import { IsNotEmpty, IsString, IsNumber, IsArray } from 'class-validator';

export class ProductDTO {
  @IsNotEmpty()
  @IsString()
  public id: string;

  @IsNotEmpty()
  @IsString()
  public title: string;

  @IsNotEmpty()
  @IsString()
  public description: string;

  @IsNotEmpty()
  @IsString()
  public img_url: string;

  @IsNotEmpty()
  @IsNumber()
  public price: number;

  @IsNotEmpty()
  @IsArray()
  public categories: string[];

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
