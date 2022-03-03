import { Module } from '@nestjs/common';
import { UtilitiesModule } from '../../Utilities/Utilities.module';
import { CategoriesRepositoryModule } from '../../Persistence/categories/CategoriesRepository.module';
import { CategoriesService } from './categories.service';

@Module({
  imports: [CategoriesRepositoryModule, UtilitiesModule],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
