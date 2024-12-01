import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

interface CheckoutStepsProps {
  currentStep: number;
  steps: string[];
}

const CheckoutSteps: React.FC<CheckoutStepsProps> = ({ currentStep, steps }) => {
  return (
    <Nav className="checkout-steps mb-4">
      {steps.map((step, index) => (
        <NavItem key={index} className="flex-fill">
          <NavLink
            className={`text-center ${index === currentStep ? 'active' : ''} 
              ${index < currentStep ? 'completed' : ''}`}
          >
            <span className="step-number">{index + 1}</span>
            <span className="step-title">{step}</span>
          </NavLink>
        </NavItem>
      ))}
    </Nav>
  );
};

export default CheckoutSteps;