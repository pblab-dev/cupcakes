import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CupcakeCard from '../../components/CupcakeCard';

const mockCupcake = {
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
};

describe('CupcakeCard', () => {
  it('renders cupcake information correctly', () => {
    const onAddToCart = vi.fn();
    render(
      <BrowserRouter>
        <CupcakeCard cupcake={mockCupcake} onAddToCart={onAddToCart} />
      </BrowserRouter>
    );

    expect(screen.getByText(mockCupcake.name)).toBeInTheDocument();
    expect(screen.getByText(`$${mockCupcake.price.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockCupcake.image);
  });

  it('calls onAddToCart when add to cart button is clicked', () => {
    const onAddToCart = vi.fn();
    render(
      <BrowserRouter>
        <CupcakeCard cupcake={mockCupcake} onAddToCart={onAddToCart} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Add to Cart'));
    expect(onAddToCart).toHaveBeenCalledWith(mockCupcake);
  });

  it('navigates to product details when image is clicked', () => {
    const onAddToCart = vi.fn();
    render(
      <BrowserRouter>
        <CupcakeCard cupcake={mockCupcake} onAddToCart={onAddToCart} />
      </BrowserRouter>
    );

    const image = screen.getByRole('img');
    fireEvent.click(image);
    expect(window.location.pathname).toBe(`/product/${mockCupcake.id}`);
  });
});