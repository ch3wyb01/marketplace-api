import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../../Persistence/products/products.repository';
import { IProduct } from './IProduct';
import { DBProductQuery } from '../../Utilities/DBProductQuery';
import { CategoriesRepository } from '../../Persistence/categories/categories.repository';
import { ICategory } from '../categories/ICategory';
import { CategoryIDMapper } from '../../Utilities/mappers/categoryId.mapper';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  async insertProduct(body: IProduct): Promise<IProduct> {
    const product: IProduct = await this.productsRepository.insertProduct(body);

    const categoryNames: string[] = this.CategoryNameMapper(product.categories);
    product.categories = categoryNames;

    return product;
  }

  async fetchAllProducts(query: DBProductQuery): Promise<IProduct[]> {
    if (query.categories) {
      const dbCategory: ICategory =
        await this.categoriesRepository.fetchCategoryByName(query.categories);
      query.categories = CategoryIDMapper(dbCategory);
    }

    const products: IProduct[] = await this.productsRepository.fetchAllProducts(
      query,
    );

    products.forEach((product) => {
      product.categories = this.CategoryNameMapper(product.categories);
    });

    return products;
  }

  async fetchProductById(prodId: string): Promise<IProduct> {
    const product: IProduct = await this.productsRepository.fetchProductById(
      prodId,
    );

    const categoryNames: string[] = this.CategoryNameMapper(product.categories);
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

    const categoryNames: string[] = this.CategoryNameMapper(product.categories);
    product.categories = categoryNames;

    return product;
  }

  async removeProductById(prodId: string) {
    await this.productsRepository.removeProductById(prodId);
  }

  private CategoryNameMapper (categories: ICategory[]): string[] {
    const categoryNames = categories.map((category) => category.category_name);
    return categoryNames;
  };
}
