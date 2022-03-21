import { Injectable } from '@nestjs/common';
import { CategoryNameMapper } from '../../Utilities/mappers/categoryName.mapper';
import { ProductsRepository } from '../../Persistence/products/products.repository';
import { IProduct } from './IProduct';
import { DBProductQuery } from '../../Utilities/DBProductQuery';
import { CategoriesRepository } from '../../Persistence/categories/categories.repository';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  async insertProduct(body: IProduct): Promise<IProduct> {
    const product: IProduct = await this.productsRepository.insertProduct(body);

    const categoryNames: string[] = CategoryNameMapper(product.categories);
    product.categories = categoryNames;

    return product;
  }

  async fetchAllProducts(query: DBProductQuery): Promise<IProduct[]> {
    if (query.categories)
      await this.categoriesRepository.fetchCategoryById(query.categories);

    //await findCategoryByID
    const products: IProduct[] = await this.productsRepository.fetchAllProducts(
      query,
    );

    products.forEach((product) => {
      product.categories = CategoryNameMapper(product.categories);
    });

    return products;
  }

  async fetchProductById(prodId: string): Promise<IProduct> {
    const product: IProduct = await this.productsRepository.fetchProductById(
      prodId,
    );

    const categoryNames: string[] = CategoryNameMapper(product.categories);
    product.categories = categoryNames;

    return product;
  }

  async updateProductById(
    prodId: string,
    updatedFields: Partial<IProduct>,
  ): Promise<IProduct> {
    const product: IProduct = await this.productsRepository.updateProductById(
      prodId,
      updatedFields,
    );

    const categoryNames: string[] = CategoryNameMapper(product.categories);
    product.categories = categoryNames;

    return product;
  }

  async removeProductById(prodId: string) {
    await this.productsRepository.removeProductById(prodId);
  }
}
