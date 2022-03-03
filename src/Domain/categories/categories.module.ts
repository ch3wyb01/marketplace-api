import { Module } from '@nestjs/common';
import { CategoriesRepositoryModule } from 'src/Persistence/categories/CategoriesRepository.module';
import { CategoriesService } from './categories.service';

@Module({
  imports: [CategoriesRepositoryModule],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
