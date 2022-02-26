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
  async addProduct(
    @Body() completeBody: { title: string; desc: string; price: number },
  ) {
    const { title, desc, price } = completeBody;
    const product = await this.productsService.insertProduct(
      title,
      desc,
      price,
    );
    return { product };
  }

  @Get()
  async getAllProducts() {
    const products = await this.productsService.fetchAllProducts();
    return { products };
  }

  @Get(':id')
  async getProductById(@Param('id') prodId: string) {
    const product = await this.productsService.fetchProductById(prodId);
    return { product };
  }

  @Patch(':id')
  async patchProductById(
    @Param('id') prodId: string,
    @Body() completeBody: { title: string; desc: string; price: number },
  ) {
    const { title, desc, price } = completeBody;
    const product = await this.productsService.updateProductById(
      prodId,
      title,
      desc,
      price,
    );
    return { product };
  }

  @Delete(':id')
  async deleteProductById(@Param('id') prodId: string) {
    await this.productsService.removeProductById(prodId);
    return null;
  }
}
