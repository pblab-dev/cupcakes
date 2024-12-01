import express from "express";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Get user's cart
router.get("/", auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.userId }).populate(
      "items.cupcake"
    );

    if (!cart) {
      cart = new Cart({ user: req.user.userId, items: [] });
      await cart.save();
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add item to cart
router.post("/items", auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Verify product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: req.user.userId });

    if (!cart) {
      cart = new Cart({ user: req.user.userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.cupcake.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ cupcake: productId, quantity });
    }

    await cart.updateTotal();
    await cart.populate("items.cupcake");

    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update cart item quantity
router.patch("/items/:cupcakeId", auth, async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user.userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      (item) => item.cupcake.toString() === req.params.cupcakeId
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter(
        (item) => item.cupcake.toString() !== req.params.cupcakeId
      );
    } else {
      item.quantity = quantity;
    }

    await cart.updateTotal();
    await cart.populate("items.cupcake");

    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Remove item from cart
router.delete("/items/:cupcakeId", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.cupcake.toString() !== req.params.cupcakeId
    );

    await cart.updateTotal();
    await cart.populate("items.cupcake");

    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Apply coupon
router.post("/coupon", auth, async (req, res) => {
  try {
    const { code } = req.body;
    const cart = await Cart.findOne({ user: req.user.userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Add coupon validation logic here
    const validCoupon = code === "WELCOME10"; // Example validation

    if (validCoupon) {
      cart.couponCode = code;
      cart.discount = 0.1; // 10% discount
      await cart.updateTotal();
      await cart.populate("items.cupcake");
      res.json(cart);
    } else {
      res.status(400).json({ message: "Invalid coupon code" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
