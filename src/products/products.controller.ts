import { Body, Controller, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  addProduct(
    @Body() completeBody: { title: string; desc: string; price: number },
  ): any {
    const { title, desc, price } = completeBody;
    const newId = this.productsService.insertProduct(title, desc, price);
    return { id: newId };
  }
}
