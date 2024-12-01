import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import CupcakeCard from "../components/CupcakeCard";
import { Cupcake } from "../types";
import { productApi } from "../services/api";
import useCartStore from "../store/useCartStore";
import toast from "react-hot-toast";

const Home = () => {
  const [featuredCupcakes, setFeaturedCupcakes] = useState<Cupcake[]>([]);
  const [recommendedCupcakes, setRecommendedCupcakes] = useState<Cupcake[]>([]);
  const [loading, setLoading] = useState(true);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchCupcakes = async () => {
      setLoading(true);
      try {
        const [featuredResponse, recommendedResponse] = await Promise.all([
          productApi.getFeatured(),
          productApi.getRecommended(),
        ]);
        setFeaturedCupcakes(featuredResponse.data);
        setRecommendedCupcakes(recommendedResponse.data);
      } finally {
        setLoading(false);
      }
    };

    fetchCupcakes();
  }, []);

  const handleAddToCart = async (cupcake: Cupcake) => {
    try {
      await addToCart(cupcake._id, 1);
      toast.success("Added to cart!");
    } catch (error) {
      // Error is handled by the API interceptor
    }
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <section className="mb-5">
        <h2 className="mb-4">Featured Cupcakes</h2>
        <Row>
          {featuredCupcakes.map((cupcake) => (
            <Col key={cupcake._id} xs={12} sm={6} lg={4} className="mb-4">
              <CupcakeCard cupcake={cupcake} onAddToCart={handleAddToCart} />
            </Col>
          ))}
        </Row>
      </section>

      <section className="mb-5">
        <h2 className="mb-4">Recommended</h2>
        <Row>
          {recommendedCupcakes.map((cupcake) => (
            <Col key={cupcake._id} xs={12} sm={6} lg={4} className="mb-4">
              <CupcakeCard cupcake={cupcake} onAddToCart={handleAddToCart} />
            </Col>
          ))}
        </Row>
      </section>
    </Container>
  );
};

export default Home;
