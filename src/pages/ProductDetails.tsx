import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Table, Card, CardBody } from "reactstrap";
import { Cupcake } from "../types";
import CupcakeCard from "../components/CupcakeCard";
import { productApi } from "../services/api";
import useCartStore from "../store/useCartStore";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cupcake, setCupcake] = useState<Cupcake | null>(null);
  const [recommendedCupcakes, setRecommendedCupcakes] = useState<Cupcake[]>([]);
  const [loading, setLoading] = useState(true);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const [productResponse, recommendedResponse] = await Promise.all([
          productApi.getById(id),
          productApi.getRecommended(),
        ]);
        setCupcake(productResponse.data);
        // Filter out the current cupcake from recommendations
        setRecommendedCupcakes(
          recommendedResponse.data
            .filter((item: Cupcake) => item._id !== id)
            .slice(0, 3)
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddToCart = async () => {
    if (!cupcake) return;
    try {
      await addToCart(cupcake._id, 1);
      toast.success("Added to cart!");
      navigate("/cart");
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

  if (!cupcake) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <h2>Product not found</h2>
          <Button color="primary" onClick={() => navigate("/products")}>
            Back to Products
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col md={6}>
          <img
            src={cupcake.image}
            alt={cupcake.name}
            className="img-fluid rounded shadow"
          />
        </Col>
        <Col md={6}>
          <h1 className="mb-3">{cupcake.name}</h1>
          <h3 className="text-primary mb-4">${cupcake.price.toFixed(2)}</h3>
          <p className="mb-4 lead">{cupcake.description}</p>
          <Button
            color="primary"
            size="lg"
            block
            onClick={handleAddToCart}
            className="mb-4"
          >
            Add to Cart
          </Button>

          <Card className="mb-4">
            <CardBody>
              <h4 className="mb-3">Nutritional Information</h4>
              <Table borderless>
                <tbody>
                  <tr>
                    <td>Calories:</td>
                    <td>{cupcake.nutrition.calories}</td>
                  </tr>
                  <tr>
                    <td>Fat:</td>
                    <td>{cupcake.nutrition.fat}g</td>
                  </tr>
                  <tr>
                    <td>Carbohydrates:</td>
                    <td>{cupcake.nutrition.carbs}g</td>
                  </tr>
                  <tr>
                    <td>Protein:</td>
                    <td>{cupcake.nutrition.protein}g</td>
                  </tr>
                  <tr>
                    <td>Sugar:</td>
                    <td>{cupcake.nutrition.sugar}g</td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {recommendedCupcakes.length > 0 && (
        <section>
          <h2 className="mb-4">You May Also Like</h2>
          <Row>
            {recommendedCupcakes.map((cupcake) => (
              <Col key={cupcake._id} md={4} className="mb-4">
                <CupcakeCard
                  cupcake={cupcake}
                  onAddToCart={() => {
                    addToCart(cupcake._id, 1);
                    toast.success("Added to cart!");
                  }}
                />
              </Col>
            ))}
          </Row>
        </section>
      )}
    </Container>
  );
};

export default ProductDetails;
