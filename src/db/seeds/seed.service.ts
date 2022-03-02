import { Connection } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class SeedDatabaseService {
  constructor(@InjectConnection() private connection: Connection) {}

  async SeedDatabase({ productsData }) {
    await this.connection.dropCollection('products');

    const productCollection = await this.connection.createCollection(
      'products',
    );

    await productCollection.insertMany(productsData);

    console.log('seeded');
  }

  async CloseConnection() {
    await this.connection.close();
  }
}
