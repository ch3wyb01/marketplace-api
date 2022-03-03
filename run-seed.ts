import developmentData from './src/Persistence/data/development-data';
import mongoose from 'mongoose';
import seed from './seed';

const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `${__dirname}/${ENV}.env`,
});

const runSeed = async () => {
  const mongo = await mongoose.connect(process.env.DB_URI);
  await seed(mongo.connection, developmentData);
  await mongo.connection.close();
  await mongo.disconnect();
};

runSeed();
