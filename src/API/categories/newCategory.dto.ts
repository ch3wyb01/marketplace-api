import { IsNotEmpty, IsString } from 'class-validator';

export class NewCategoryDTO {
  @IsNotEmpty()
  @IsString()
  public category_name: string;
  
  @IsNotEmpty()
  @IsString()
  public category_description: string;

  constructor(category_name: string, category_description: string) {
    this.category_name = category_name;
    this.category_description = category_description;
  }
}
