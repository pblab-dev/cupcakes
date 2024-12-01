import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import User from '../models/User.js';

dotenv.config();

const products = [
  {
    name: 'Chocolate Dream',
    price: 4.99,
    description: 'Rich chocolate cupcake with creamy chocolate frosting, topped with chocolate shavings and a cherry.',
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80',
    nutrition: {
      calories: 350,
      fat: 18,
      carbs: 45,
      protein: 5,
      sugar: 32
    },
    featured: true,
    recommended: true
  },
  {
    name: 'Vanilla Bliss',
    price: 3.99,
    description: 'Classic vanilla cupcake with smooth vanilla buttercream frosting and rainbow sprinkles.',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80',
    nutrition: {
      calories: 320,
      fat: 16,
      carbs: 42,
      protein: 4,
      sugar: 28
    },
    featured: true,
    recommended: false
  },
  {
    name: 'Red Velvet Delight',
    price: 4.49,
    description: 'Luxurious red velvet cupcake with cream cheese frosting and white chocolate curls.',
    image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&w=800&q=80',
    nutrition: {
      calories: 340,
      fat: 17,
      carbs: 44,
      protein: 5,
      sugar: 30
    },
    featured: false,
    recommended: true
  },
  {
    name: 'Strawberry Fields',
    price: 4.29,
    description: 'Fresh strawberry cupcake with strawberry buttercream and fresh berry garnish.',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80',
    nutrition: {
      calories: 310,
      fat: 15,
      carbs: 41,
      protein: 4,
      sugar: 29
    },
    featured: true,
    recommended: true
  },
  {
    name: 'Lemon Sunshine',
    price: 3.99,
    description: 'Zesty lemon cupcake with lemon curd filling and meringue topping.',
    image: 'https://images.unsplash.com/photo-1519869491916-8ca6f615d6bd?auto=format&fit=crop&w=800&q=80',
    nutrition: {
      calories: 300,
      fat: 14,
      carbs: 40,
      protein: 4,
      sugar: 26
    },
    featured: false,
    recommended: true
  },
  {
    name: 'Salted Caramel',
    price: 4.99,
    description: 'Moist vanilla cupcake filled with salted caramel, topped with caramel buttercream and a caramel drizzle.',
    image: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=800&q=80',
    nutrition: {
      calories: 380,
      fat: 20,
      carbs: 48,
      protein: 5,
      sugar: 35
    },
    featured: true,
    recommended: false
  }
];

const adminUser = {
  name: 'Admin User',
  email: 'admin@example.com',
  password: 'admin123',
  isAdmin: true
};

async function populate() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      Product.deleteMany({}),
      User.deleteMany({})
    ]);
    console.log('Cleared existing data');

    // Insert products
    await Product.insertMany(products);
    console.log('Products inserted');

    // Create admin user
    await User.create(adminUser);
    console.log('Admin user created');

    console.log('Database populated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error populating database:', error);
    process.exit(1);
  }
}

populate();