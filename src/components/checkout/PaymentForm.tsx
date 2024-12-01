import React from "react";
import { Button, Alert } from "reactstrap";
import toast from "react-hot-toast";

interface PaymentFormProps {
  onSuccess: (paymentIntentId: string) => void;
  shippingAddress: any;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  onSuccess,
  shippingAddress,
}) => {
  const [error, setError] = React.useState<string | null>(null);
  const [processing, setProcessing] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setProcessing(true);
    setError(null);

    try {
      // Fake payment processing
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const paymentIntentId = "fake_payment_intent_id";

      toast.success("Payment successful!");
      onSuccess(paymentIntentId);
    } catch (error) {
      setError("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Card Number"
          className="form-control"
          required
        />
      </div>

      {error && (
        <Alert color="danger" className="mb-4">
          {error}
        </Alert>
      )}

      <Button color="primary" type="submit" disabled={processing} block>
        {processing ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  );
};

export default PaymentForm;
