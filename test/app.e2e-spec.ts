import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import testData from '../src/db/data/test-data/index';
import { SeedDatabaseService } from '../src/db/seeds/seed.service';

let app: INestApplication;
let seedService: SeedDatabaseService;

beforeEach(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
    providers: [SeedDatabaseService]
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();

  seedService = app.get(SeedDatabaseService);
  await seedService.SeedDatabase(testData);
});

afterAll(async () => {
  await seedService.CloseConnection();
});

describe('Tests', () => {
  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/products').expect(200);
  });
});
