import React from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <Container className="py-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-5">Contact Us</h1>
        <Row>
          <Col md={6} className="mb-4 mb-md-0">
            <h4 className="mb-4">Get in Touch</h4>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input id="name" required />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" id="email" required />
              </FormGroup>
              <FormGroup>
                <Label for="message">Message</Label>
                <Input type="textarea" id="message" rows={5} required />
              </FormGroup>
              <Button color="primary" type="submit">
                Send Message
              </Button>
            </Form>
          </Col>
          <Col md={6}>
            <h4 className="mb-4">Contact Information</h4>
            <div className="mb-4">
              <div className="d-flex align-items-center mb-3">
                <MapPin className="text-primary me-2" />
                <h5 className="mb-0">Address</h5>
              </div>
              <p className="text-muted">
                123 Cupcake Street<br />
                Sweet City, SC 12345<br />
                United States
              </p>
            </div>
            <div className="mb-4">
              <div className="d-flex align-items-center mb-3">
                <Phone className="text-primary me-2" />
                <h5 className="mb-0">Phone</h5>
              </div>
              <p className="text-muted">
                +1 (555) 123-4567
              </p>
            </div>
            <div className="mb-4">
              <div className="d-flex align-items-center mb-3">
                <Mail className="text-primary me-2" />
                <h5 className="mb-0">Email</h5>
              </div>
              <p className="text-muted">
                info@sweetdelights.com
              </p>
            </div>
          </Col>
        </Row>
      </motion.div>
    </Container>
  );
};

export default Contact;