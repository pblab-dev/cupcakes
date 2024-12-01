import React from 'react';
import { Container, Row, Col, Card, CardBody, Badge } from 'reactstrap';
import { motion } from 'framer-motion';
import { Clock, Percent, Gift } from 'lucide-react';

const Promotions = () => {
  const promotions = [
    {
      id: 1,
      title: 'Welcome Discount',
      description: 'Get 10% off your first order with code WELCOME10',
      code: 'WELCOME10',
      discount: 10,
      validUntil: '2024-12-31',
      icon: Percent
    },
    {
      id: 2,
      title: 'Buy 6 Get 1 Free',
      description: 'Purchase any 6 cupcakes and get 1 classic cupcake free',
      code: 'BUY6GET1',
      icon: Gift
    },
    {
      id: 3,
      title: 'Happy Hour Special',
      description: '20% off all orders between 2 PM - 4 PM',
      discount: 20,
      validUntil: '2024-12-31',
      icon: Clock
    }
  ];

  return (
    <Container className="py-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-4">Current Promotions</h1>
        <Row>
          {promotions.map((promo, index) => (
            <Col key={promo.id} md={6} lg={4} className="mb-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-100 shadow-sm hover-shadow">
                  <CardBody className="d-flex flex-column">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                        <promo.icon size={24} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="h5 mb-1">{promo.title}</h3>
                        {promo.discount && (
                          <Badge color="primary" pill>
                            {promo.discount}% OFF
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-muted mb-4">{promo.description}</p>
                    {promo.code && (
                      <div className="mt-auto">
                        <div className="bg-light p-2 rounded text-center">
                          <small className="text-muted">Use Code:</small>
                          <div className="fw-bold">{promo.code}</div>
                        </div>
                      </div>
                    )}
                    {promo.validUntil && (
                      <div className="mt-3 text-center">
                        <small className="text-muted">
                          Valid until {new Date(promo.validUntil).toLocaleDateString()}
                        </small>
                      </div>
                    )}
                  </CardBody>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </motion.div>
    </Container>
  );
};

export default Promotions;