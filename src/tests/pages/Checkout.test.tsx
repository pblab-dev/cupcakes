import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Checkout from '../../pages/Checkout';

describe('Checkout', () => {
  it('renders shipping form initially', () => {
    render(
      <BrowserRouter>
        <Checkout />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/street address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/state/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/zip code/i)).toBeInTheDocument();
  });

  it('validates required fields in shipping form', async () => {
    render(
      <BrowserRouter>
        <Checkout />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText(/continue to payment/i));
    expect(await screen.findAllByText(/is required/i)).toHaveLength(5);
  });

  it('proceeds to payment step when shipping form is valid', async () => {
    render(
      <BrowserRouter>
        <Checkout />
      </BrowserRouter>
    );

    fireEvent.input(screen.getByLabelText(/street address/i), { target: { value: '123 Test St' } });
    fireEvent.input(screen.getByLabelText(/city/i), { target: { value: 'Test City' } });
    fireEvent.input(screen.getByLabelText(/state/i), { target: { value: 'Test State' } });
    fireEvent.input(screen.getByLabelText(/zip code/i), { target: { value: '12345' } });
    fireEvent.input(screen.getByLabelText(/country/i), { target: { value: 'Test Country' } });

    fireEvent.click(screen.getByText(/continue to payment/i));
    expect(await screen.findByText(/payment information/i)).toBeInTheDocument();
  });
});