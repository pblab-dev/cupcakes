import React from 'react';
import { Container } from 'reactstrap';
import { motion } from 'framer-motion';

const Returns = () => {
  return (
    <Container className="py-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-4">Returns & Refunds</h1>
        
        <section className="mb-5">
          <h3>Return Policy</h3>
          <p>Due to the perishable nature of our products, we cannot accept returns. However, we want you to be completely satisfied with your purchase.</p>
        </section>

        <section className="mb-5">
          <h3>Quality Guarantee</h3>
          <p>If you're not satisfied with the quality of your order, please contact us within 24 hours of delivery.</p>
        </section>

        <section className="mb-5">
          <h3>Refund Process</h3>
          <p>If a refund is approved:</p>
          <ul>
            <li>Credit card refunds process in 3-5 business days</li>
            <li>Store credit is available immediately</li>
            <li>Original shipping charges are non-refundable</li>
          </ul>
        </section>

        <section>
          <h3>Contact Us</h3>
          <p>For any issues with your order, please contact our customer service team:</p>
          <ul>
            <li>Email: support@sweetdelights.com</li>
            <li>Phone: (555) 123-4567</li>
          </ul>
        </section>
      </motion.div>
    </Container>
  );
};

export default Returns;