import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import NewsletterForm from './NewsletterForm';

const Footer = () => {
  return (
    <footer className="bg-light mt-auto py-5">
      <Container>
        <Row>
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="mb-3">Sweet Delights</h5>
            <p className="text-muted">
              Bringing joy through delicious cupcakes since 2024.
            </p>
            <div className="d-flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted">
                <Facebook className="cursor-pointer" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted">
                <Instagram className="cursor-pointer" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted">
                <Twitter className="cursor-pointer" />
              </a>
            </div>
          </Col>
          <Col md={2} className="mb-4 mb-md-0">
            <h6 className="mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/about" className="text-decoration-none text-muted">About Us</Link>
              </li>
              <li className="mb-2">
                <Link to="/products" className="text-decoration-none text-muted">Our Products</Link>
              </li>
              <li className="mb-2">
                <Link to="/promotions" className="text-decoration-none text-muted">Special Offers</Link>
              </li>
              <li className="mb-2">
                <Link to="/blog" className="text-decoration-none text-muted">Blog</Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-decoration-none text-muted">Contact Us</Link>
              </li>
            </ul>
          </Col>
          <Col md={3} className="mb-4 mb-md-0">
            <h6 className="mb-3">Customer Service</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/shipping-policy" className="text-decoration-none text-muted">Shipping Information</Link>
              </li>
              <li className="mb-2">
                <Link to="/returns-policy" className="text-decoration-none text-muted">Returns & Refunds</Link>
              </li>
              <li className="mb-2">
                <Link to="/privacy-policy" className="text-decoration-none text-muted">Privacy Policy</Link>
              </li>
              <li className="mb-2">
                <Link to="/terms" className="text-decoration-none text-muted">Terms & Conditions</Link>
              </li>
              <li className="mb-2">
                <Link to="/faq" className="text-decoration-none text-muted">FAQ</Link>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <h6 className="mb-3">Newsletter</h6>
            <p className="text-muted mb-3">Subscribe to get special offers and updates!</p>
            <NewsletterForm />
          </Col>
        </Row>
        <hr className="my-4" />
        <div className="text-center text-muted">
          © {new Date().getFullYear()} Sweet Delights. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;