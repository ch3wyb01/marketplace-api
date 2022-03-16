import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { APIModule } from './API/API.module';
import { DomainModule } from './Domain/Domain.module';
import { PersistenceModule } from './Persistence/Persistence.module';
import { UtilitiesModule } from './Utilities/Utilities.module';
import { APP_FILTER } from '@nestjs/core';
import { CustomExceptionHandler } from './Utilities/CustomExceptionHandler';

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
    APIModule,
    DomainModule,
    PersistenceModule,
    UtilitiesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CustomExceptionHandler,
    },
  ],
})
export class AppModule {}
