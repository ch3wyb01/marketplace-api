import { Module } from '@nestjs/common';
import { SeedDatabaseService } from './seeds/seed.service';

@Module({
  providers: [SeedDatabaseService],
  exports: [SeedDatabaseService],
})
export class UtilitiesModule {}
