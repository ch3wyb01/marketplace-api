import { Module } from '@nestjs/common';
import { ProductsRepositoryModule } from './products/ProductsRepository.module';

@Module({
  imports: [ProductsRepositoryModule],
  exports: [ProductsRepositoryModule],
})
export class PersistenceModule {}
