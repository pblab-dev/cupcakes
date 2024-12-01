import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import mongoose from 'mongoose';
import User from '../server/models/User';
import dotenv from 'dotenv';

dotenv.config();

describe('User Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create & save user successfully', async () => {
    const validUser = new User({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123'
    });
    const savedUser = await validUser.save();
    
    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(validUser.name);
    expect(savedUser.email).toBe(validUser.email);
    expect(savedUser.password).not.toBe('password123'); // Password should be hashed
  });

  it('should fail to save user without required fields', async () => {
    const userWithoutRequiredField = new User({ name: 'John Doe' });
    let err;
    try {
      await userWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('should not save duplicate email', async () => {
    const firstUser = new User({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123'
    });
    await firstUser.save();

    const duplicateUser = new User({
      name: 'Jane Doe',
      email: 'john@example.com',
      password: 'password456'
    });

    let err;
    try {
      await duplicateUser.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
  });
});