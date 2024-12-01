import express from "express";
import { auth } from "../middleware/auth.js";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post("/create-payment-intent", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.userId }).populate(
      "items.cupcake"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Fake payment intent creation
    const paymentIntent = {
      id: "fake_payment_intent_id",
      client_secret: "fake_client_secret",
    };

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/complete", auth, async (req, res) => {
  try {
    const { paymentIntentId, shippingAddress } = req.body;
    const cart = await Cart.findOne({ user: req.user.userId }).populate(
      "items.cupcake"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Create order
    const order = new Order({
      user: req.user.userId,
      items: cart.items.map((item) => ({
        product: item.cupcake._id,
        quantity: item.quantity,
        price: item.cupcake.price,
      })),
      total: cart.total,
      shippingAddress,
      paymentStatus: "paid",
      status: "processing",
    });

    await order.save();

    // Clear cart
    cart.items = [];
    cart.total = 0;
    cart.couponCode = null;
    cart.discount = 0;
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
