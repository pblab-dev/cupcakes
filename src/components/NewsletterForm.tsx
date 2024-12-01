import React, { useState } from 'react';
import { Form, Input, Button, Spinner } from 'reactstrap';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { newsletterApi } from '../services/api';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      await newsletterApi.subscribe(email);
      toast.success('Successfully subscribed to newsletter!');
      setEmail('');
    } catch (error) {
      // Error is handled by the API interceptor
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="newsletter-form">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="input-group"
      >
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="form-control"
        />
        <Button color="primary" disabled={loading}>
          {loading ? (
            <Spinner size="sm" />
          ) : (
            'Subscribe'
          )}
        </Button>
      </motion.div>
    </Form>
  );
};

export default NewsletterForm;