import { Module } from '@nestjs/common';
import { DomainModule } from '../Domain/Domain.module';
import { UtilitiesModule } from '../Utilities/Utilities.module';
import { CategoriesController } from './categories/categories.controller';
import { ProductsController } from './products/products.controller';

@Module({
  imports: [DomainModule, UtilitiesModule],
  controllers: [ProductsController, CategoriesController],
})
export class APIModule {}
