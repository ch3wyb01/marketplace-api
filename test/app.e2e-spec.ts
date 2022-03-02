import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import testData from '../src/db/data/test-data/index';
import { SeedDatabaseService } from '../src/db/seeds/seed.service';
import { ProductDTO } from 'src/products/product.dto';

let app: INestApplication;
let seedService: SeedDatabaseService;

beforeEach(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
    providers: [SeedDatabaseService],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();

  seedService = app.get(SeedDatabaseService);
  await seedService.SeedDatabase(testData);
});

afterAll(async () => {
  await seedService.CloseConnection();
});

describe('GET /products', () => {
  test('200: returns array of product objects', async () => {
    const {
      body: { products },
    } = await request(app.getHttpServer()).get('/products').expect(200);
    expect(products).toHaveLength(3);
    products.forEach((product: ProductDTO) => {
      expect(product).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          title: expect.any(String),
          description: expect.any(String),
          price: expect.any(Number),
        }),
      );
    });
  });
});

describe('GET /products/:id', () => {
  test('200: returns product of given ID', async () => {
    const {
      body: { product },
    } = await request(app.getHttpServer())
      .get('/products/621f912430f443d5067c39f0')
      .expect(200);
    expect(product).toEqual({
      id: '621f912430f443d5067c39f0',
      title: 'Abacus',
      description: 'A wooden abacus that will help teach counting skills',
      price: 10,
    });
  });
});
