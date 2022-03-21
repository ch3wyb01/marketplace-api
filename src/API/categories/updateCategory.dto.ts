import { IsString, IsOptional } from 'class-validator';

export class UpdateCategoryDTO {
  @IsOptional()
  @IsString()
  public category_name: string;

  @IsOptional()
  @IsString()
  public category_description: string;
}
