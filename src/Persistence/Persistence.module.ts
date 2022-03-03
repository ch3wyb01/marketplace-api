import { Module } from '@nestjs/common';
import { CategoriesRepositoryModule } from './categories/CategoriesRepository.module';
import { ProductsRepositoryModule } from './products/ProductsRepository.module';

@Module({
  imports: [ProductsRepositoryModule, CategoriesRepositoryModule],
  exports: [ProductsRepositoryModule, CategoriesRepositoryModule],
})
export class PersistenceModule {}
