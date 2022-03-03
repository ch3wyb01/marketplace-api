import { Module } from '@nestjs/common';
import { PersistenceModule } from '../Persistence/Persistence.module';
import { UtilitiesModule } from '../Utilities/Utilities.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ProductsModule, PersistenceModule, UtilitiesModule],
  providers: [],
  exports: [ProductsModule]
})
export class DomainModule {}
