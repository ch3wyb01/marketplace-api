import { Module } from '@nestjs/common';
import { PersistenceModule } from 'src/Persistence/Persistence.Module';
import { UtilitiesModule } from 'src/Utilities/Utilities.module';

@Module({
  imports: [PersistenceModule, UtilitiesModule],
})
export class DomainModule {}
