import mongoose from 'mongoose';

const productsData = [
  {
    _id: new mongoose.Types.ObjectId('621f912430f443d5067c39f0'),
    title: 'Abacus',
    description: 'A wooden abacus that will help teach counting skills',
    price: 10,
    categories: ['6220f9ab230ed15af3d3dffa', '6220f9ab230ed15af3d3dffb'],
  },
  {
    _id: new mongoose.Types.ObjectId('621f912430f443d5067c39f1'),
    title: 'Blue Whale Plush',
    description: 'A small whale teddy',
    price: 8,
    categories: ['6220f9ab230ed15af3d3dffb'],
  },
  {
    _id: new mongoose.Types.ObjectId('621f912430f443d5067c39f2'),
    title: 'Crystal Wine Glasses',
    description: 'A set of 4 wine glasses',
    price: 30,
    categories: ['6220f9ab230ed15af3d3dffc'],
  },
];

export default productsData;
