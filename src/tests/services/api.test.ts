import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { productApi, userApi } from '../../services/api';

const server = setupServer(
  rest.get('http://localhost:3000/api/products', (req, res, ctx) => {
    return res(ctx.json([
      {
        id: '1',
        name: 'Test Cupcake',
        price: 3.99
      }
    ]));
  }),
  rest.post('http://localhost:3000/api/users/login', (req, res, ctx) => {
    return res(ctx.json({ token: 'test-token' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('API Service', () => {
  describe('Product API', () => {
    it('fetches products successfully', async () => {
      const response = await productApi.getAll();
      expect(response.data).toHaveLength(1);
      expect(response.data[0].name).toBe('Test Cupcake');
    });

    it('handles product fetch error', async () => {
      server.use(
        rest.get('http://localhost:3000/api/products', (req, res, ctx) => {
          return res(ctx.status(500));
        })
      );

      await expect(productApi.getAll()).rejects.toThrow();
    });
  });

  describe('User API', () => {
    it('logs in user successfully', async () => {
      const response = await userApi.login({
        email: 'test@example.com',
        password: 'password'
      });
      expect(response.data.token).toBe('test-token');
    });

    it('handles login error', async () => {
      server.use(
        rest.post('http://localhost:3000/api/users/login', (req, res, ctx) => {
          return res(ctx.status(401));
        })
      );

      await expect(userApi.login({
        email: 'test@example.com',
        password: 'wrong'
      })).rejects.toThrow();
    });
  });
});