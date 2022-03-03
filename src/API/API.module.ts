import { Module } from '@nestjs/common';
import { DomainModule } from 'src/Domain/Domain.module';
import { UtilitiesModule } from 'src/Utilities/Utilities.module';
import { ProductsController } from './products/products.controller';

@Module({
  imports: [DomainModule, UtilitiesModule],
  controllers: [ProductsController],
})
export class APIModule {}
