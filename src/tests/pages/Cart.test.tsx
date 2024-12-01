import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Cart from '../../pages/Cart';

const mockCartItems = [
  {
    cupcake: {
      id: '1',
      name: 'Test Cupcake',
      price: 3.99,
      image: 'https://example.com/image.jpg',
      description: 'Test description',
      nutrition: {
        calories: 300,
        fat: 15,
        carbs: 40,
        protein: 4,
        sugar: 25
      }
    },
    quantity: 2
  }
];

describe('Cart', () => {
  it('renders empty cart message when no items', () => {
    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    );
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });

  it('renders cart items and total', () => {
    vi.spyOn(React, 'useState').mockReturnValueOnce([mockCartItems, vi.fn()]);
    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    );

    expect(screen.getByText(mockCartItems[0].cupcake.name)).toBeInTheDocument();
    expect(screen.getByText(`$${(mockCartItems[0].cupcake.price * mockCartItems[0].quantity).toFixed(2)}`)).toBeInTheDocument();
  });

  it('updates quantity when clicking quantity buttons', () => {
    vi.spyOn(React, 'useState').mockReturnValueOnce([mockCartItems, vi.fn()]);
    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    );

    const increaseButton = screen.getByRole('button', { name: /increase/i });
    fireEvent.click(increaseButton);
    expect(screen.getByDisplayValue('3')).toBeInTheDocument();
  });
});