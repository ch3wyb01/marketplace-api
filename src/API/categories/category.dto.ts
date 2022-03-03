export class CategoryDTO {
  category_name: string;
  category_description: string;

  constructor(category_name: string, category_description: string) {
    this.category_name = category_name;
    this.category_description = category_description;
  }
}
