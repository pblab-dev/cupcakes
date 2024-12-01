import React from 'react';
import { Container } from 'reactstrap';
import { motion } from 'framer-motion';

const Terms = () => {
  return (
    <Container className="py-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-4">Terms & Conditions</h1>
        
        <section className="mb-5">
          <h3>Agreement to Terms</h3>
          <p>By accessing and using our website, you agree to be bound by these Terms and Conditions.</p>
        </section>

        <section className="mb-5">
          <h3>Use of Website</h3>
          <p>You agree to use our website only for lawful purposes and in a way that does not infringe the rights of any third party.</p>
        </section>

        <section className="mb-5">
          <h3>Ordering and Payment</h3>
          <ul>
            <li>All orders are subject to availability</li>
            <li>Prices are subject to change without notice</li>
            <li>Payment must be made in full at time of purchase</li>
          </ul>
        </section>

        <section className="mb-5">
          <h3>Delivery</h3>
          <p>We aim to deliver all orders within the specified timeframe, but delays may occur due to circumstances beyond our control.</p>
        </section>

        <section>
          <h3>Modifications</h3>
          <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website.</p>
        </section>
      </motion.div>
    </Container>
  );
};

export default Terms;