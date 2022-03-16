import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class UpdateProductDTO {
  @IsOptional()
  @IsString()
  public title: string;

  @IsOptional()
  @IsString()
  public description: string;

  @IsOptional()
  @IsString()
  public img_url: string;

  @IsOptional()
  @IsNumber()
  public price: number;

  @IsOptional()
  @IsArray()
  public categories: string[];

  constructor(
    title?: string,
    description?: string,
    img_url?: string,
    price?: number,
    categories?: string[],
  ) {
    this.title = title;
    this.description = description;
    this.img_url = img_url;
    this.price = price;
    this.categories = categories;
  }
}
