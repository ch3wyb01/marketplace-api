import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import testData from '../src/Persistence/data/test-data/index';
import { SeedDatabaseService } from '../src/Utilities/seeds/seed.service';
import { ProductDTO } from '../src/API/products/product.dto';
import { CategoryDTO } from '../src/API/categories/category.dto';
import { validationPipeOptions } from '../src/Utilities/exceptionHandler/validation/validationPipeOptions';
import endpointsDesc from '../src/API/endpoints.json';

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

describe('/', () => {
  describe('GET /', () => {
    test('200: returns JSON of endpoints description', async () => {
      const {
        body: { endpoints },
      } = await request(app.getHttpServer()).get('/').expect(200);
      expect(endpoints).toEqual(endpointsDesc);
    });
  });
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
    test('200: returns array of products with the given category when passed a category name', async () => {
      const {
        body: { products },
      } = await request(app.getHttpServer())
        .get('/products?category=toys')
        .expect(200);
      expect(products).toHaveLength(2);
      products.forEach((product: ProductDTO) => {
        expect(product).toEqual(
          expect.objectContaining({
            id: expect.any(String),
            title: expect.any(String),
            description: expect.any(String),
            img_url: expect.any(String),
            price: expect.any(Number),
            categories: expect.arrayContaining(['Toys']),
          }),
        );
      });
    });
    test('200: returns array of products within the correct price range when passed both price queries', async () => {
      const {
        body: { products },
      } = await request(app.getHttpServer())
        .get('/products?priceMin=5&priceMax=20')
        .expect(200);
      expect(products).toHaveLength(2);
      products.forEach((product: ProductDTO) => {
        expect(product.price).toBeGreaterThanOrEqual(5);
        expect(product.price).toBeLessThanOrEqual(20);
      });
    });
    test('200: returns array of products with titles containing the title query', async () => {
      const {
        body: { products },
      } = await request(app.getHttpServer())
        .get('/products?title=wine%20glasses')
        .expect(200);
      expect(products).toHaveLength(1);
      products.forEach((product: ProductDTO) => {
        expect(product).toEqual(
          expect.objectContaining({
            title: 'Crystal Wine Glasses',
          }),
        );
      });
    });
    test('200: returns array of products with titles containing the title query', async () => {
      const {
        body: { products },
      } = await request(app.getHttpServer())
        .get('/products?title=us')
        .expect(200);
      expect(products).toHaveLength(2);
      products.forEach((product: ProductDTO) => {
        expect(product.title).toEqual(expect.stringContaining('us'));
      });
    });
    test('404: returns not found message when passed valid but non-existent category name query', async () => {
      const {
        body: { errors },
      } = await request(app.getHttpServer())
        .get('/products?category=621f812430f463d5067c39f2')
        .expect(404);
      expect(errors).toBe('Category not found');
    });
    test('400: returns validation error message when passed invalid priceMin query', async () => {
      const {
        body: { errors },
      } = await request(app.getHttpServer())
        .get('/products?priceMin=pennies')
        .expect(400);
      expect(errors).toEqual({
        priceMin:
          'priceMin must be a number conforming to the specified constraints',
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
        categories: ['6220f9ab230ed15af3d3dffc', '6220f9ab230ed15af3d3dffb'],
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
          categories: ['Household', 'Toys'],
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
    test('400: returns validation error message when passed one valid and one invalid category ID', async () => {
      const newProduct = {
        title: 'A new product',
        description: 'This is shiny and brand new',
        img_url: 'https://img_url.com',
        price: 100,
        categories: ['6220f9ab230ed15af3d3dffc', 'invalid'],
      };
      const {
        body: { errors },
      } = await request(app.getHttpServer())
        .post('/products')
        .send(newProduct)
        .expect(400);
      expect(errors).toEqual({
        categories: 'Invalid Category ID at index 1',
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
    test('204: removes product of given ID from database', async () => {
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
    test('404: returns not found message when passed valid but non-existent category ID', async () => {
      const {
        body: { errors },
      } = await request(app.getHttpServer())
        .get('/categories/621f812430f463d5067c39f2')
        .expect(404);
      expect(errors).toBe('Category not found');
    });
    test('400: returns validation error message when passed invalid category ID', async () => {
      const {
        body: { errors },
      } = await request(app.getHttpServer())
        .get('/categories/invalid')
        .expect(400);
      expect(errors).toEqual({
        category: 'Invalid Category ID',
      });
    });
  });

  describe('PATCH /categories/:id', () => {
    test('200: returns updated category when passed one new field', async () => {
      const updatedFields = {
        category_name: 'Knowledge',
      };
      const {
        body: { category },
      } = await request(app.getHttpServer())
        .patch('/categories/6220f9ab230ed15af3d3dffa')
        .send(updatedFields)
        .expect(200);
      expect(category).toEqual(
        expect.objectContaining({
          id: '6220f9ab230ed15af3d3dffa',
          category_name: 'Knowledge',
          category_description: 'Learning is fun-damental!',
        }),
      );
    });
    test('200: returns updated category when passed multiple new fields', async () => {
      const updatedFields = {
        category_name: 'Knowledge',
        category_description: 'Knowledge is power!',
      };
      const {
        body: { category },
      } = await request(app.getHttpServer())
        .patch('/categories/6220f9ab230ed15af3d3dffa')
        .send(updatedFields)
        .expect(200);
      expect(category).toEqual(
        expect.objectContaining({
          id: '6220f9ab230ed15af3d3dffa',
          category_name: 'Knowledge',
          category_description: 'Knowledge is power!',
        }),
      );
    });
    test('404: returns not found message when passed valid but non-existent category ID', async () => {
      const updatedFields = {
        category_name: 'Knowledge',
        category_description: 'Knowledge is power!',
      };
      const {
        body: { errors },
      } = await request(app.getHttpServer())
        .patch('/categories/6233246d2c4bc091a3b1a0c6')
        .send(updatedFields)
        .expect(404);
      expect(errors).toBe('Category not found');
    });
    test('400: returns validation error message when passed invalid category ID', async () => {
      const updatedFields = {
        category_name: 'Knowledge',
        category_description: 'Knowledge is power!',
      };
      const {
        body: { errors },
      } = await request(app.getHttpServer())
        .patch('/categories/989invalid')
        .send(updatedFields)
        .expect(400);
      expect(errors).toEqual({
        category: 'Invalid Category ID',
      });
    });
    test('400: returns validation error message when passed invalid property type', async () => {
      const updatedFields = {
        category_name: 785,
        category_description: 'Knowledge is power!',
      };
      const {
        body: { errors },
      } = await request(app.getHttpServer())
        .patch('/categories/6220f9ab230ed15af3d3dffa')
        .send(updatedFields)
        .expect(400);
      expect(errors).toEqual({
        category_name: 'category_name must be a string',
      });
    });
    test('400: returns validation error message when passed multiple invalid property type', async () => {
      const updatedFields = {
        category_name: 785,
        category_description: ['learning', 'fun'],
      };
      const {
        body: { errors },
      } = await request(app.getHttpServer())
        .patch('/categories/6220f9ab230ed15af3d3dffa')
        .send(updatedFields)
        .expect(400);
      expect(errors).toEqual({
        category_name: 'category_name must be a string',
        category_description: 'category_description must be a string',
      });
    });
  });

  describe('DELETE /categories/:id', () => {
    test('204: removes category of given ID from database', async () => {
      await request(app.getHttpServer())
        .delete('/categories/6220f9ab230ed15af3d3dffb')
        .expect(204);
      const {
        body: { categories },
      } = await request(app.getHttpServer()).get('/categories').expect(200);
      categories.forEach((category: CategoryDTO) => {
        expect(category).toEqual(
          expect.not.objectContaining({
            id: '6220f9ab230ed15af3d3dffb',
            category_name: 'Toys',
            category_description: 'Fun for all ages',
          }),
        );
      });
    });
    test('404: returns not found message when passed valid but non-existent category ID', async () => {
      const {
        body: { errors },
      } = await request(app.getHttpServer())
        .delete('/categories/621f812430f463d5067c39f2')
        .expect(404);
      expect(errors).toBe("Category not found and couldn't be deleted");
    });
    test('400: returns validation error message when passed invalid category ID', async () => {
      const {
        body: { errors },
      } = await request(app.getHttpServer())
        .delete('/categories/notanid465')
        .expect(400);
      expect(errors).toEqual({
        category: 'Invalid Category ID',
      });
    });
  });

  describe('GET category by name', () => {
    test('200 category by name ', async () => {
      const {
        body: { category },
      } = await request(app.getHttpServer())
        .get('/categories/category/Household')
        .expect(200);
    });
  });
});
