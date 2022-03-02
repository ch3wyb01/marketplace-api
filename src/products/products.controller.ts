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
import { Product } from 'src/db/schemas/product.schema';
import { ProductMapper } from './product.mapper';
import { ProductDTO } from './product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body() completeBody: { title: string; desc: string; price: number },
  ): Promise<{ product: ProductDTO }> {
    const { title, desc, price } = completeBody;
    const dbProduct = await this.productsService.insertProduct(
      title,
      desc,
      price,
    );

    const product = ProductMapper(dbProduct);

    return { product };
  }

  @Get()
  async getAllProducts(): Promise<{ products: ProductDTO[] }> {
    const dbProducts: Product[] = await this.productsService.fetchAllProducts();
    const products = dbProducts.map(ProductMapper);
    return { products };
  }

  @Get(':id')
  async getProductById(
    @Param('id') prodId: string,
  ): Promise<{ product: ProductDTO }> {
    const dbProduct = await this.productsService.fetchProductById(prodId);
    const product = ProductMapper(dbProduct);
    return { product };
  }

  @Patch(':id')
  async patchProductById(
    @Param('id') prodId: string,
    @Body() completeBody: { title: string; desc: string; price: number },
  ): Promise<{product: ProductDTO}> {
    const { title, desc, price } = completeBody;
    const dbProduct = await this.productsService.updateProductById(
      prodId,
      title,
      desc,
      price,
    );

    const product = ProductMapper(dbProduct);

    return { product };
  }

  @Delete(':id')
  async deleteProductById(@Param('id') prodId: string) {
    await this.productsService.removeProductById(prodId);
    return null;
  }
}
