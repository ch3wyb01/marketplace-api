const seed = async (connection, { productsData }) => {
  await connection.dropCollection('products');

  const productCollection = await connection.createCollection('products');

  await productCollection.insertMany(productsData);

  console.log('seeded');
};

export default seed;