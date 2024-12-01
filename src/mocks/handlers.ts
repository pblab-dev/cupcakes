import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('http://localhost:3000/api/products', () => {
    return HttpResponse.json([
      {
        id: '1',
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
      }
    ]);
  }),

  http.post('http://localhost:3000/api/users/login', () => {
    return HttpResponse.json({
      token: 'test-token'
    });
  })
];