import mongoose from 'mongoose';
import { ICategory } from 'src/Domain/categories/ICategory';

const categoriesData = [
  {
    _id: new mongoose.Types.ObjectId('62274a4b1b3b71dc83f59cb7'),
    category_name: 'Furniture',
    category_description:
      'Home is where the heart is, so find furniture that you love',
  },
  {
    _id: new mongoose.Types.ObjectId('62274a4b1b3b71dc83f59cb8'),
    category_name: 'Art',
    category_description: 'Make your home your own private gallery',
  },
];

export default categoriesData;
