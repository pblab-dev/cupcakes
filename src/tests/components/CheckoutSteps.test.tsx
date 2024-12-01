import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CheckoutSteps from '../../components/CheckoutSteps';

describe('CheckoutSteps', () => {
  const steps = ['Cart', 'Shipping', 'Payment', 'Confirmation'];

  it('renders all steps', () => {
    render(<CheckoutSteps steps={steps} currentStep={0} />);
    steps.forEach(step => {
      expect(screen.getByText(step)).toBeInTheDocument();
    });
  });

  it('marks current step as active', () => {
    render(<CheckoutSteps steps={steps} currentStep={1} />);
    const shippingStep = screen.getByText('Shipping').closest('.nav-link');
    expect(shippingStep).toHaveClass('active');
  });

  it('marks previous steps as completed', () => {
    render(<CheckoutSteps steps={steps} currentStep={2} />);
    const cartStep = screen.getByText('Cart').closest('.nav-link');
    const shippingStep = screen.getByText('Shipping').closest('.nav-link');
    expect(cartStep).toHaveClass('completed');
    expect(shippingStep).toHaveClass('completed');
  });
});