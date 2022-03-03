import { Module } from '@nestjs/common';
import { PersistenceModule } from 'src/Persistence/Persistence.Module';
import { UtilitiesModule } from 'src/Utilities/Utilities.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ProductsModule, PersistenceModule, UtilitiesModule],
  providers: [],
  exports: [ProductsModule]
})
export class DomainModule {}
