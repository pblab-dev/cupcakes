import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { motion } from 'framer-motion';
import CupcakeCard from '../components/CupcakeCard';
import { Cupcake } from '../types';
import { productApi } from '../services/api';
import useCartStore from '../store/useCartStore';
import toast from 'react-hot-toast';

const Recommended = () => {
  const [cupcakes, setCupcakes] = useState<Cupcake[]>([]);
  const [loading, setLoading] = useState(true);
  const addToCart = useCartStore(state => state.addToCart);

  useEffect(() => {
    const fetchRecommended = async () => {
      setLoading(true);
      try {
        const { data } = await productApi.getRecommended();
        setCupcakes(data);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommended();
  }, []);

  const handleAddToCart = async (cupcake: Cupcake) => {
    try {
      await addToCart(cupcake.id, 1);
      toast.success('Added to cart!');
    } catch (error) {
      // Error is handled by the API interceptor
    }
  };

  return (
    <Container className="py-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-4">Recommended for You</h1>
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <Row>
            {cupcakes.map((cupcake) => (
              <Col key={cupcake.id} xs={12} sm={6} lg={4} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <CupcakeCard
                    cupcake={cupcake}
                    onAddToCart={handleAddToCart}
                  />
                </motion.div>
              </Col>
            ))}
          </Row>
        )}
      </motion.div>
    </Container>
  );
};

export default Recommended;