import React from 'react';
import { Container } from 'reactstrap';
import { motion } from 'framer-motion';

const Privacy = () => {
  return (
    <Container className="py-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-4">Privacy Policy</h1>
        
        <section className="mb-5">
          <h3>Information We Collect</h3>
          <p>We collect information that you provide directly to us, including:</p>
          <ul>
            <li>Name and contact information</li>
            <li>Payment information</li>
            <li>Delivery addresses</li>
            <li>Order history</li>
          </ul>
        </section>

        <section className="mb-5">
          <h3>How We Use Your Information</h3>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Process your orders</li>
            <li>Send order confirmations and updates</li>
            <li>Provide customer support</li>
            <li>Send marketing communications (with your consent)</li>
          </ul>
        </section>

        <section className="mb-5">
          <h3>Information Sharing</h3>
          <p>We do not sell or share your personal information with third parties except:</p>
          <ul>
            <li>To process payments</li>
            <li>To fulfill orders</li>
            <li>As required by law</li>
          </ul>
        </section>

        <section>
          <h3>Your Rights</h3>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
          </ul>
        </section>
      </motion.div>
    </Container>
  );
};

export default Privacy;