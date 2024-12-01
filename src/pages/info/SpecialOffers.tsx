import React from 'react';
import { Container, Row, Col, Card } from 'reactstrap';
import { motion } from 'framer-motion';
import { Gift, Clock, Tag } from 'lucide-react';

const SpecialOffers = () => {
  const offers = [
    {
      title: 'Buy One Get One Free',
      description: 'Every Tuesday on selected cupcakes',
      icon: Gift,
      validUntil: '2024-12-31'
    },
    {
      title: 'Happy Hour',
      description: '20% off between 3-5 PM daily',
      icon: Clock,
      validUntil: '2024-12-31'
    },
    {
      title: 'Bulk Order Discount',
      description: '15% off on orders over $50',
      icon: Tag,
      validUntil: '2024-12-31'
    }
  ];

  return (
    <Container className="py-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-5">Special Offers</h1>
        <Row>
          {offers.map((offer, index) => (
            <Col key={index} md={4} className="mb-4">
              <Card className="h-100 shadow-sm p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                    <offer.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="h5 mb-0">{offer.title}</h3>
                </div>
                <p className="text-muted mb-3">{offer.description}</p>
                <small className="text-muted">
                  Valid until {new Date(offer.validUntil).toLocaleDateString()}
                </small>
              </Card>
            </Col>
          ))}
        </Row>
      </motion.div>
    </Container>
  );
};

export default SpecialOffers;