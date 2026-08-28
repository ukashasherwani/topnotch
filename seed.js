import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/productModel.js';

dotenv.config();

const products = [
  {
    name: "Modern Minimalist Sofa",
    price: 499,
    description: "Comfortable 3-seater fabric sofa with sleek wooden legs.",
    category: "Sofas",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    inStock: true
  },
  {
    name: "Nordic Wooden Dining Table",
    price: 299,
    description: "Solid oak dining table for modern interior spaces.",
    category: "Tables",
    image: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=800&q=80",
    inStock: true
  },
  {
    name: "Ergonomic Lounge Chair",
    price: 180,
    description: "Stylishly crafted chair featuring premium leather upholstery.",
    category: "Chairs",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80",
    inStock: true
  },
  {
    name: "Minimalist Bedframe",
    price: 650,
    description: "Queen size sturdy wood bedframe with natural finish.",
    category: "Beds",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
    inStock: true
  }
];

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB Atlas...");

    await Product.deleteMany({});
    await Product.insertMany(products);

    console.log("Data successfully imported with automatic MongoDB IDs!");
    process.exit();
  } catch (error) {
    console.error("Error importing data:", error);
    process.exit(1);
  }
};

importData();