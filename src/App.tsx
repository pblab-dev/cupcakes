import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "reactstrap";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import UserProfile from "./pages/UserProfile";
import OrderTracking from "./pages/OrderTracking";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Promotions from "./pages/Promotions";
import Recommended from "./pages/Recommended";
import PrivateRoute from "./components/PrivateRoute";

// Info pages
import SpecialOffers from "./pages/info/SpecialOffers";
import Blog from "./pages/info/Blog";
import Contact from "./pages/info/Contact";
import FAQ from "./pages/info/FAQ";

// Policy pages
import Shipping from "./pages/policies/Shipping";
import Returns from "./pages/policies/Returns";
import Privacy from "./pages/policies/Privacy";
import Terms from "./pages/policies/Terms";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <Container className="flex-grow-1 py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/promotions" element={<Promotions />} />
            <Route path="/recommended" element={<Recommended />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Info pages */}
            <Route path="/special-offers" element={<SpecialOffers />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />

            {/* Policy pages */}
            <Route path="/shipping-policy" element={<Shipping />} />
            <Route path="/returns-policy" element={<Returns />} />
            <Route path="/privacy-policy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route
              path="/checkout"
              element={
                <PrivateRoute>
                  <Checkout />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <UserProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <PrivateRoute>
                  <OrderTracking />
                </PrivateRoute>
              }
            />
          </Routes>
        </Container>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;
