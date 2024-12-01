import React from 'react';
import { Container } from 'reactstrap';
import { motion } from 'framer-motion';

const Shipping = () => {
  return (
    <Container className="py-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-4">Shipping Information</h1>
        
        <section className="mb-5">
          <h3>Delivery Areas</h3>
          <p>We currently deliver to all locations within the United States.</p>
        </section>

        <section className="mb-5">
          <h3>Shipping Methods</h3>
          <ul>
            <li>Standard Shipping (3-5 business days)</li>
            <li>Express Shipping (1-2 business days)</li>
            <li>Same Day Delivery (select areas only)</li>
          </ul>
        </section>

        <section className="mb-5">
          <h3>Shipping Rates</h3>
          <p>Shipping rates are calculated based on:</p>
          <ul>
            <li>Delivery location</li>
            <li>Order size and weight</li>
            <li>Selected shipping method</li>
          </ul>
        </section>

        <section>
          <h3>Order Tracking</h3>
          <p>Once your order ships, you'll receive a tracking number via email to monitor your delivery.</p>
        </section>
      </motion.div>
    </Container>
  );
};

export default Shipping;