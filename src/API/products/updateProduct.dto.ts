import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class UpdateProductDTO {
  @IsOptional()
  @IsString()
  public title?: string;

  @IsOptional()
  @IsString()
  public description?: string;

  @IsOptional()
  @IsString()
  public img_url?: string;

  @IsOptional()
  @IsNumber()
  public price?: number;

  @IsOptional()
  @IsArray()
  public categories?: string[];
}
