import mongoose from 'mongoose';

const categoriesData = [
  {
    _id: new mongoose.Types.ObjectId('6220f9ab230ed15af3d3dffa'),
    category_name: 'Education',
    category_description: 'Learning is fun-damental!',
  },
  {
    _id: new mongoose.Types.ObjectId('6220f9ab230ed15af3d3dffb'),
    category_name: 'Toys',
    category_description: 'Fun for all ages',
  },
  {
    _id: new mongoose.Types.ObjectId('6220f9ab230ed15af3d3dffc'),
    category_name: 'Household',
    category_description:
      'Home is where the heart is, so find products that you love',
  },
];

export default categoriesData;
