import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import testData from '../src/Persistence/data/test-data/index';
import { SeedDatabaseService } from '../src/Utilities/seeds/seed.service';
import { ProductDTO } from '../src/API/products/product.dto';
import { CategoryDTO } from '../src/API/categories/category.dto';
import { validationPipeOptions } from '../src/Utilities/exceptionHandler/validation/validationPipeOptions';

let app: INestApplication;
let seedService: SeedDatabaseService;

beforeEach(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
    providers: [SeedDatabaseService],
  }).compile();

  app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
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
            img_url: expect.any(String),
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
        img_url: 'https://img_url.com',
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
          img_url: 'https://img_url.com',
          price: 100,
          categories: ['Household'],
        }),
      );
    });
    test('400: returns validation error message when passed missing property type', async () => {
      const newProduct = {
        title: 'A new product',
        description: 'This is shiny and brand new',
        img_url: 'https://img_url.com',
        categories: ['6220f9ab230ed15af3d3dffc'],
      };
      const {
        body: { type, errors },
      } = await request(app.getHttpServer())
        .post('/products')
        .send(newProduct)
        .expect(400);
      expect(type).toBe('Validation');
      expect(errors).toEqual({
        price: 'price must be a number conforming to the specified constraints',
      });
    });
    test('400: returns validation error message when passed multiple invalid property types', async () => {
      const newProduct = {
        title: 28,
        description: 'This is shiny and brand new',
        img_url: 'https://img_url.com',
        price: 'pennies',
        categories: ['6220f9ab230ed15af3d3dffc'],
      };
      const {
        body: { errors },
      } = await request(app.getHttpServer())
        .post('/products')
        .send(newProduct)
        .expect(400);
      expect(errors).toEqual({
        title: 'title must be a string',
        price: 'price must be a number conforming to the specified constraints',
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
      expect(product).toEqual(
        expect.objectContaining({
          id: '621f912430f443d5067c39f0',
          title: 'Abacus',
          description: 'A wooden abacus that will help teach counting skills',
          price: 10,
          categories: ['Education', 'Toys'],
        }),
      );
    });
    test('404: returns not found message when passed valid but non-existent product ID', async () => {
      const {
        body: { type, errors },
      } = await request(app.getHttpServer())
        .get('/products/621f812430f463d5067c39f2')
        .expect(404);
      expect(type).toBe('HTTP');
      expect(errors).toBe('Product not found');
    });
    test('400: returns validation error message when passed invalid product ID', async () => {
      const {
        body: { type, errors },
      } = await request(app.getHttpServer()).get('/products/268').expect(400);
      expect(type).toBe('Validation');
      expect(errors).toEqual({
        product: 'Invalid Product ID',
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
    test('200: returns updated product when passed multiple new fields', async () => {
      const updateFields = {
        description: 'A small fluffy whale plush toy',
        categories: ['6220f9ab230ed15af3d3dffa'],
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
          categories: ['Education'],
        }),
      );
    });
    test('200: returns original product when passed no new fields', async () => {
      const updateFields = {};
      const {
        body: { product },
      } = await request(app.getHttpServer())
        .patch('/products/621f912430f443d5067c39f1')
        .send(updateFields)
        .expect(200);
      expect(product).toEqual(
        expect.objectContaining({
          title: 'Blue Whale Plush',
          description: 'A small whale teddy',
          price: 8,
          categories: ['Toys'],
        }),
      );
    });
    test('404: returns not found message when passed valid but non-existent product ID', async () => {
      const updateFields = {
        description: 'A small fluffy whale plush toy',
      };
      const {
        body: { errors },
      } = await request(app.getHttpServer())
        .patch('/products/621f812430f463d5067c39f8')
        .send(updateFields)
        .expect(404);
      expect(errors).toBe('Product not found');
    });
    test('400: returns validation error message when passed invalid product ID', async () => {
      const updateFields = {
        description: 'A small fluffy whale plush toy',
      };
      const {
        body: { errors },
      } = await request(app.getHttpServer())
        .patch('/products/invalid26')
        .send(updateFields)
        .expect(400);
      expect(errors).toEqual({
        product: 'Invalid Product ID',
      });
    });
    test('400: returns validation error message when passed invalid property type', async () => {
      const updateFields = { description: 33 };
      const {
        body: { errors },
      } = await request(app.getHttpServer())
        .patch('/products/621f912430f443d5067c39f1')
        .send(updateFields)
        .expect(400);
      expect(errors).toEqual({
        description: 'description must be a string',
      });
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
    test('404: returns not found message when passed valid but non-existent product ID', async () => {
      const {
        body: { errors },
      } = await request(app.getHttpServer())
        .delete('/products/621f812430f463d5067c39f8')
        .expect(404);
      expect(errors).toBe("Product not found and couldn't be deleted");
    });
    test('400: returns validation error message when passed invalid product ID', async () => {
      const {
        body: { errors },
      } = await request(app.getHttpServer())
        .delete('/products/invalid26')
        .expect(400);
      expect(errors).toEqual({
        product: 'Invalid Product ID',
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
    test('400: returns validation error message when passed invalid property type', async () => {
      const newCategory = {
        category_name: 64,
        category_description: 'Why not make your own grass greener?',
      };
      const {
        body: { errors },
      } = await request(app.getHttpServer())
        .post('/categories')
        .send(newCategory)
        .expect(400);
      expect(errors).toEqual({
        category_name: 'category_name must be a string',
      });
    });
    test('400: returns validation error message when passed multiple invalid property types', async () => {
      const newCategory = {
        category_name: 64,
        category_description: { desc: 'here is a description' },
      };
      const {
        body: { errors },
      } = await request(app.getHttpServer())
        .post('/categories')
        .send(newCategory)
        .expect(400);
      expect(errors).toEqual({
        category_name: 'category_name must be a string',
        category_description: 'category_description must be a string',
      });
    });
  });

  describe('GET /categories/:id', () => {
    test('200: returns category of given ID', async () => {
      const {
        body: { category },
      } = await request(app.getHttpServer())
        .get('/categories/6220f9ab230ed15af3d3dffa')
        .expect(200);
      expect(category).toEqual(
        expect.objectContaining({
          id: '6220f9ab230ed15af3d3dffa',
          category_name: 'Education',
          category_description: 'Learning is fun-damental!',
        }),
      );
    });
  });
});
