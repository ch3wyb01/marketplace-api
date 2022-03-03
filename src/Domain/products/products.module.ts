import { Module } from '@nestjs/common';
import { ProductsRepositoryModule } from '../../Persistence/products/ProductsRepository.module';
import { UtilitiesModule } from '../../Utilities/Utilities.module';
import { ProductsService } from './products.service';

@Module({
  imports: [ProductsRepositoryModule, UtilitiesModule],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
