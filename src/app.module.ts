import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeedDatabaseService } from './db/seeds/seed.service';
import { ProductsModule } from './products/products.module';

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
    ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService, SeedDatabaseService],
})
export class AppModule {}
