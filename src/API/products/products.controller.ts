import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
// import { ProductsService } from '../../Database/products/products.repository';
import { Product } from 'src/Persistence/products/product.schema';
import { ProductMapper } from '../../Utilities/product.mapper';
import { ProductDTO } from './product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body() completeBody: { title: string; description: string; price: number },
  ): Promise<{ product: ProductDTO }> {
    const { title, description, price } = completeBody;
    const dbProduct = await this.productsService.insertProduct(
      title,
      description,
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
  @HttpCode(200)
  async patchProductById(
    @Param('id') prodId: string,
    @Body() completeBody: { title: string; description: string; price: number },
  ): Promise<{ product: ProductDTO }> {
    const { title, description, price } = completeBody;

    const dbProduct = await this.productsService.updateProductById(
      prodId,
      title,
      description,
      price,
    );

    const product = ProductMapper(dbProduct);

    return { product };
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteProductById(@Param('id') prodId: string) {
    await this.productsService.removeProductById(prodId);
  }
}
