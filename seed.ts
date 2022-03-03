import { Connection } from 'mongoose';
import { CategorySchema } from './src/Persistence/categories/category.schema';
import { ProductSchema } from './src/Persistence/products/product.schema';

const seed = async (
  connection: Connection,
  { categoriesData, productsData },
) => {
  const categoryCollection = connection.model('categories', CategorySchema);
  await categoryCollection.deleteMany();
  await categoryCollection.insertMany(categoriesData);

  const productCollection = connection.model('products', ProductSchema);
  await productCollection.deleteMany();
  await productCollection.insertMany(productsData);

};

export default seed;
