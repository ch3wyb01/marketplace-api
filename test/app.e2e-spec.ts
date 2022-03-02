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

afterEach(async () => {
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

describe('POST /products', () => {
  test('201: returns new product', async () => {
    const newProduct = {
      title: 'A new product',
      description: 'This is shiny and brand new',
      price: 100,
    };
    const {
      body: { product },
    } = await request(app.getHttpServer())
      .post('/products')
      .send(newProduct)
      .expect(201);
    expect(product).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: 'A new product',
        description: 'This is shiny and brand new',
        price: 100,
      }),
    );
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

describe('PATCH /products/:id', () => {
  test('200: returns updated product when passed one new field', async () => {
    const updateFields = {
      description: 'A small fluffy whale plush toy',
    };
    const {
      body: { product },
    } = await request(app.getHttpServer())
      .patch('/products/621f912430f443d5067c39f1')
      .send(updateFields)
      .expect(200);
    expect(product).toEqual(
      expect.objectContaining({
        title: 'Blue Whale Plush',
        description: 'A small fluffy whale plush toy',
        price: 8,
      }),
    );
  });
});

describe('DELETE /products/:id', () => {
  test('204: removes product from database', async () => {
    await request(app.getHttpServer())
      .delete('/products/621f912430f443d5067c39f2')
      .expect(204);
    const {
      body: { products },
    } = await request(app.getHttpServer()).get('/products').expect(200);
    products.forEach((product: ProductDTO) => {
      expect(product).toEqual(
        expect.not.objectContaining({
          id: '621f912430f443d5067c39f2',
        }),
      );
    });
  });
});