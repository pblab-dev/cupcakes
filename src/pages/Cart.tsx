import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Input, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import useCartStore from "../store/useCartStore";
import useAuthStore from "../store/useAuthStore";
import toast from "react-hot-toast";

const Cart = () => {
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const {
    items,
    total,
    isLoading,
    fetchCart,
    updateQuantity,
    removeItem,
    applyCoupon,
  } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    try {
      await updateQuantity(itemId, Math.max(1, newQuantity));
    } catch (error) {
      // Error is handled by the API interceptor
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      await removeItem(itemId);
      toast.success("Item removed from cart");
    } catch (error) {
      // Error is handled by the API interceptor
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    try {
      await applyCoupon(couponCode);
      toast.success("Coupon applied successfully!");
    } catch (error) {
      // Error is handled by the API interceptor
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error("Please login to complete your purchase");
      navigate("/login");
      return;
    }
    navigate("/checkout");
  };

  if (isLoading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

  if (items.length === 0) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <h3>Your cart is empty</h3>
          <Button
            color="primary"
            className="mt-3"
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4">Shopping Cart</h1>
      <Row>
        <Col md={8}>
          <Table responsive>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.cupcake._id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={item.cupcake.image}
                        alt={item.cupcake.name}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                        className="me-3 rounded"
                      />
                      {item.cupcake.name}
                    </div>
                  </td>
                  <td>${item.cupcake.price.toFixed(2)}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <Button
                        color="light"
                        size="sm"
                        onClick={() =>
                          handleUpdateQuantity(
                            item.cupcake._id,
                            item.quantity - 1
                          )
                        }
                      >
                        <Minus size={16} />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleUpdateQuantity(
                            item.cupcake._id,
                            parseInt(e.target.value)
                          )
                        }
                        className="mx-2"
                        style={{ width: "60px" }}
                        min="1"
                      />
                      <Button
                        color="light"
                        size="sm"
                        onClick={() =>
                          handleUpdateQuantity(
                            item.cupcake._id,
                            item.quantity + 1
                          )
                        }
                      >
                        <Plus size={16} />
                      </Button>
                    </div>
                  </td>
                  <td>${(item.cupcake.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <Button
                      color="danger"
                      size="sm"
                      onClick={() => handleRemoveItem(item.cupcake._id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col md={4}>
          <Card className="p-4">
            <h4 className="mb-3">Order Summary</h4>
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="mb-3">
              <Input
                type="text"
                placeholder="Coupon Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="mb-2"
              />
              <Button color="secondary" block onClick={handleApplyCoupon}>
                Apply Coupon
              </Button>
            </div>
            <hr />
            <div className="d-flex justify-content-between mb-3">
              <strong>Total:</strong>
              <strong>${total.toFixed(2)}</strong>
            </div>
            <Button color="primary" block onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
