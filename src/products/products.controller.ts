import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
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

  @Get()
  getAllProducts() {
    return { products: this.productsService.fetchAllProducts() };
  }

  @Get(':id')
  getProductById(@Param('id') prodId: string) {
    return { product: this.productsService.fetchProductById(prodId) };
  }

  @Patch(':id')
  patchProductById(
    @Param('id') prodId: string,
    @Body() completeBody: { title: string; desc: string; price: number },
  ) {
    const { title, desc, price } = completeBody;
    this.productsService.updateProductById(prodId, title, desc, price);
    return null;
  }

  @Delete(':id')
  deleteProductById(@Param('id') prodId: string) {
    this.productsService.removeProductById(prodId);
    return null;
  }
}
