import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../../Persistence/products/products.repository';
import { IProduct } from './IProduct';
import { CategoriesRepository } from '../../Persistence/categories/categories.repository';
import { ICategory } from '../categories/ICategory';
import { IProductQuery } from './IProductQuery';

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

  async fetchAllProducts(query: IProductQuery): Promise<IProduct[]> {
    if (query.category) {
      const categoryName =
        query.category[0].toUpperCase() + query.category.slice(1).toLowerCase();

      const dbCategory: ICategory =
        await this.categoriesRepository.fetchCategoryByName(categoryName);

      query.category = dbCategory._id;
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

  private CategoryNameMapper(categories: ICategory[]): string[] {
    const categoryNames = categories.map((category) => category.category_name);
    return categoryNames;
  }
}
