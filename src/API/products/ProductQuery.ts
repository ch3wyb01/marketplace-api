import { IsString, IsNumber, IsOptional } from 'class-validator';

export class ProductQuery {
  @IsOptional()
  @IsString()
  public title?: string;

  @IsOptional()
  @IsNumber()
  public price?: number;

  @IsOptional()
  @IsString()
  public category?: string;
}
