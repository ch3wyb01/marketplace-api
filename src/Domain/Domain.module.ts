import { Module } from '@nestjs/common';
import { PersistenceModule } from '../Persistence/Persistence.module';
import { UtilitiesModule } from '../Utilities/Utilities.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ProductsModule,
    CategoriesModule,
    PersistenceModule,
    UtilitiesModule,
  ],
  providers: [],
  exports: [ProductsModule, CategoriesModule],
})
export class DomainModule {}
