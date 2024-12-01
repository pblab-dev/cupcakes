import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
} from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import PaymentForm from "../components/checkout/PaymentForm";
import { checkoutApi } from "../services/api";
import { Address } from "../types";
import toast from "react-hot-toast";

//const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY!);

const CHECKOUT_STEPS = ["Shipping", "Payment", "Confirmation"];

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [shippingAddress, setShippingAddress] = useState<Address | null>(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Address>();

  const fakeStripePaymentRequest = async () => {
    return new Promise<{ paymentIntentId: string }>((resolve) => {
      setTimeout(() => {
        resolve({ paymentIntentId: "fake_payment_intent_id" });
      }, 1000);
    });
  };

  const onSubmitAddress = (data: Address) => {
    setShippingAddress(data);
    setCurrentStep(1);
  };

  const handlePaymentSuccess = async () => {
    try {
      const {
        data: { paymentIntentId },
      } = await checkoutApi.createPaymentIntent();
      await checkoutApi.completeCheckout({
        paymentIntentId,
        shippingAddress,
      });
      setCurrentStep(2);
      toast.success("Order placed successfully!");
    } catch (error) {
      toast.error("Failed to complete order");
    }
  };

  const renderShippingStep = () => (
    <Form onSubmit={handleSubmit(onSubmitAddress)}>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="street">Street Address</Label>
            <Controller
              name="street"
              control={control}
              rules={{ required: "Street address is required" }}
              render={({ field }) => (
                <Input id="street" {...field} invalid={!!errors.street} />
              )}
            />
            {errors.street && (
              <span className="text-danger">{errors.street.message}</span>
            )}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="city">City</Label>
            <Controller
              name="city"
              control={control}
              rules={{ required: "City is required" }}
              render={({ field }) => (
                <Input id="city" {...field} invalid={!!errors.city} />
              )}
            />
            {errors.city && (
              <span className="text-danger">{errors.city.message}</span>
            )}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <FormGroup>
            <Label for="state">State</Label>
            <Controller
              name="state"
              control={control}
              rules={{ required: "State is required" }}
              render={({ field }) => (
                <Input id="state" {...field} invalid={!!errors.state} />
              )}
            />
            {errors.state && (
              <span className="text-danger">{errors.state.message}</span>
            )}
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="zipCode">ZIP Code</Label>
            <Controller
              name="zipCode"
              control={control}
              rules={{ required: "ZIP code is required" }}
              render={({ field }) => (
                <Input id="zipCode" {...field} invalid={!!errors.zipCode} />
              )}
            />
            {errors.zipCode && (
              <span className="text-danger">{errors.zipCode.message}</span>
            )}
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="country">Country</Label>
            <Controller
              name="country"
              control={control}
              rules={{ required: "Country is required" }}
              render={({ field }) => (
                <Input id="country" {...field} invalid={!!errors.country} />
              )}
            />
            {errors.country && (
              <span className="text-danger">{errors.country.message}</span>
            )}
          </FormGroup>
        </Col>
      </Row>
      <Button color="primary" type="submit" className="mt-3">
        Continue to Payment
      </Button>
    </Form>
  );

  const renderPaymentStep = () => (
    <Card className="p-4">
      <h4 className="mb-4">Payment Information</h4>
      <PaymentForm
        onSuccess={handlePaymentSuccess}
        shippingAddress={shippingAddress}
      />
    </Card>
  );

  const renderConfirmationStep = () => (
    <div className="text-center">
      <h3 className="mb-4">Order Confirmed!</h3>
      <p className="mb-4">Thank you for your order!</p>
      <p className="text-muted mb-4">
        We'll send you an email with your order details and tracking
        information.
      </p>
      <Button color="primary" onClick={() => navigate("/")}>
        Continue Shopping
      </Button>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderShippingStep();
      case 1:
        return renderPaymentStep();
      case 2:
        return renderConfirmationStep();
      default:
        return null;
    }
  };

  return (
    <Container className="py-5">
      <h1 className="mb-4">Checkout</h1>
      <CheckoutSteps currentStep={currentStep} steps={CHECKOUT_STEPS} />
      {renderCurrentStep()}
    </Container>
  );
};

export default Checkout;
