import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/productModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const products = [
  {
    name: 'Modern Minimalist Sofa',
    price: 499,
    description: 'Comfortable 3-seater fabric sofa with sleek wooden legs.',
    category: 'Sofas',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
    inStock: true
  },
  {
    name: 'Nordic Wooden Dining Table',
    price: 299,
    description: 'Solid oak dining table for modern interior spaces.',
    category: 'Tables',
    image: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=600&q=80',
    inStock: true
  },
  {
    name: 'Ergonomic Lounge Chair',
    price: 180,
    description: 'Stylishly crafted chair featuring premium leather upholstery.',
    category: 'Chairs',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80',
    inStock: true
  },
  {
    name: 'Minimalist Bedframe',
    price: 650,
    description: 'Queen size sturdy wood bedframe with natural finish.',
    category: 'Beds',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80',
    inStock: true
  }
];

const seedDB = async () => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Database Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error('Seeding Error:', error);
    process.exit(1);
  }
};

seedDB();