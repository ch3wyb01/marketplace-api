import { Module } from '@nestjs/common';
import { CategoriesRepositoryModule } from '../../Persistence/categories/CategoriesRepository.module';
import { ProductsRepositoryModule } from '../../Persistence/products/ProductsRepository.module';
import { UtilitiesModule } from '../../Utilities/Utilities.module';
import { CategoriesService } from '../categories/categories.service';
import { ProductsService } from './products.service';

@Module({
  imports: [ProductsRepositoryModule, UtilitiesModule, CategoriesRepositoryModule],
  providers: [ProductsService, CategoriesService],
  exports: [ProductsService, CategoriesService],
})
export class ProductsModule {}
