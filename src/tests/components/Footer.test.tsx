import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '../../components/Footer';

describe('Footer', () => {
  it('renders company name and description', () => {
    render(<Footer />);
    expect(screen.getByText('Sweet Delights')).toBeInTheDocument();
    expect(screen.getByText(/bringing joy through delicious cupcakes/i)).toBeInTheDocument();
  });

  it('renders social media icons', () => {
    render(<Footer />);
    expect(screen.getByRole('img', { name: /facebook/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /instagram/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /twitter/i })).toBeInTheDocument();
  });

  it('renders newsletter subscription form', () => {
    render(<Footer />);
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByText('Subscribe')).toBeInTheDocument();
  });
});