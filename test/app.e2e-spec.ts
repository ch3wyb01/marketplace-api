import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import testData from '../src/Persistence/data/test-data/index';
import { SeedDatabaseService } from '../src/Utilities/seeds/seed.service';
import { ProductDTO } from '../src/API/products/product.dto';
import { CategoryDTO } from 'src/API/categories/category.dto';

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
describe('/products', () => {
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
            categories: expect.arrayContaining([expect.any(String)]),
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
        categories: ['6220f9ab230ed15af3d3dffc'],
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
          categories: ['Household'],
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
        categories: ['Education', 'Toys'],
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
          categories: ['Toys'],
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
});

describe('/categories', () => {
  describe('GET /categories', () => {
    test('200: returns array of categories', async () => {
      const {
        body: { categories },
      } = await request(app.getHttpServer()).get('/categories').expect(200);
      expect(categories).toHaveLength(3);
      categories.forEach((category: CategoryDTO) => {
        expect(category).toEqual(
          expect.objectContaining({
            id: expect.any(String),
            category_name: expect.any(String),
            category_description: expect.any(String),
          }),
        );
      });
    });
  });

  describe('POST /categories', () => {
    test('201: should create and return new category', async () => {
      const newCategory = {
        category_name: 'Garden',
        category_description: 'Why not make your own grass greener?',
      };
      const {
        body: { category },
      } = await request(app.getHttpServer())
        .post('/categories')
        .send(newCategory)
        .expect(201);
      expect(category).toEqual(
        expect.objectContaining({
          category_name: 'Garden',
          category_description: 'Why not make your own grass greener?',
        }),
      );
    });
  });
});
