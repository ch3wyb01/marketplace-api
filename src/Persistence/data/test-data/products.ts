import mongoose from 'mongoose';

const productsData = [
  {
    _id: new mongoose.Types.ObjectId('621f912430f443d5067c39f0'),
    title: 'Abacus',
    description: 'A wooden abacus that will help teach counting skills',
    img_url:
      'https://images.unsplash.com/photo-1548690596-f1722c190938?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=874&q=80',
    price: 10,
    categories: ['6220f9ab230ed15af3d3dffa', '6220f9ab230ed15af3d3dffb'],
  },
  {
    _id: new mongoose.Types.ObjectId('621f912430f443d5067c39f1'),
    title: 'Blue Whale Plush',
    description: 'A small whale teddy',
    img_url:
      'https://images.unsplash.com/photo-1584155828260-3791b07e6afb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=865&q=80',
    price: 8,
    categories: ['6220f9ab230ed15af3d3dffb'],
  },
  {
    _id: new mongoose.Types.ObjectId('621f912430f443d5067c39f2'),
    title: 'Crystal Wine Glasses',
    description: 'A set of 4 wine glasses',
    img_url:
      'https://images.unsplash.com/photo-1598306442928-4d90f32c6866?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
    price: 30,
    categories: ['6220f9ab230ed15af3d3dffc'],
  },
];

export default productsData;
