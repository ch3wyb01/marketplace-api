import { Connection } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import seed from '../../../seed';

@Injectable()
export class SeedDatabaseService {
  constructor(@InjectConnection() private connection: Connection) {}

  async SeedDatabase(data) {
    await seed(this.connection, data);
  }

  async CloseConnection() {
    await this.connection.close();
  }
}
