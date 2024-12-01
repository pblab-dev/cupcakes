import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import mongoose from 'mongoose';
import Product from '../server/models/Product';
import dotenv from 'dotenv';

dotenv.config();

describe('Product Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create & save product successfully', async () => {
    const validProduct = new Product({
      name: 'Test Cupcake',
      price: 3.99,
      description: 'A test cupcake',
      image: 'https://example.com/image.jpg',
      nutrition: {
        calories: 300,
        fat: 15,
        carbs: 40,
        protein: 4,
        sugar: 25
      }
    });
    const savedProduct = await validProduct.save();
    
    expect(savedProduct._id).toBeDefined();
    expect(savedProduct.name).toBe(validProduct.name);
    expect(savedProduct.price).toBe(validProduct.price);
  });

  it('should fail to save product without required fields', async () => {
    const productWithoutRequiredField = new Product({ name: 'Test Cupcake' });
    let err;
    try {
      await productWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });
});