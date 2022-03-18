import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { IProduct } from 'src/Domain/products/IProduct';
import { UpdateMapper } from '../../Utilities/mappers/update.mapper';
import { ProductsService } from '../../Domain/products/products.service';
import { ProductMapper } from '../../Utilities/mappers/product.mapper';
import { NewProductDTO } from './newProduct.dto';
import { ProductDTO } from './product.dto';
import { UpdateProductDTO } from './updateProduct.dto';
import { ProductQuery } from './ProductQuery';
import { ProductQueryMapper } from '../../Utilities/mappers/productsQuery.mapper';
import { DBProductQuery } from '../../Utilities/DBProductQuery';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body()
    completeBody: NewProductDTO,
  ): Promise<{ product: ProductDTO }> {
    const dbProduct: IProduct = await this.productsService.insertProduct(
      completeBody,
    );

    const product: ProductDTO = ProductMapper(dbProduct);

    return { product };
  }

  @Get()
  async getAllProducts(
    @Query() query: ProductQuery,
  ): Promise<{ products: ProductDTO[] }> {
    const queries: DBProductQuery = query ? ProductQueryMapper(query) : {};

    const dbProducts: IProduct[] = await this.productsService.fetchAllProducts(
      queries,
    );

    const products: ProductDTO[] = dbProducts.map(ProductMapper);

    return { products };
  }

  @Get(':id')
  async getProductById(
    @Param('id') prodId: string,
  ): Promise<{ product: ProductDTO }> {
    const dbProduct: IProduct = await this.productsService.fetchProductById(
      prodId,
    );

    const product: ProductDTO = ProductMapper(dbProduct);

    return { product };
  }

  @Patch(':id')
  @HttpCode(200)
  async patchProductById(
    @Param('id') prodId: string,
    @Body()
    completeBody: UpdateProductDTO,
  ): Promise<{ product: ProductDTO }> {
    const updatedFields: Partial<IProduct> = UpdateMapper(completeBody);

    const dbProduct: IProduct = await this.productsService.updateProductById(
      prodId,
      updatedFields,
    );

    const product: ProductDTO = ProductMapper(dbProduct);

    return { product };
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteProductById(@Param('id') prodId: string) {
    await this.productsService.removeProductById(prodId);
  }
}
