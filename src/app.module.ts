import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeedDatabaseService } from './Utilities/seeds/seed.service';
import { APIModule } from './API/API.module';
import { DomainModule } from './Domain/Domain.module';
import { PersistenceModule } from './Persistence/Persistence.module';
import { UtilitiesModule } from './Utilities/Utilities.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.env.NODE_ENV || 'development'}.env`,
    }),
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return <MongooseModuleOptions>{
          uri: config.get<string>('DB_URI'),
        };
      },
      inject: [ConfigService],
    }),
    APIModule, DomainModule, PersistenceModule, UtilitiesModule
  ],
  controllers: [AppController],
  providers: [AppService, SeedDatabaseService],
})
export class AppModule {}
