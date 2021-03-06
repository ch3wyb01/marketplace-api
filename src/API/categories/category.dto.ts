import { IsNotEmpty, IsString } from 'class-validator';

export class CategoryDTO {
  @IsNotEmpty()
  @IsString()
  public id: string;

  @IsNotEmpty()
  @IsString()
  public category_name: string;

  @IsNotEmpty()
  @IsString()
  public category_description: string;

  constructor(id: string, category_name: string, category_description: string) {
    this.id = id;
    this.category_name = category_name;
    this.category_description = category_description;
  }
}
