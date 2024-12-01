import React, { useEffect, useState } from "react";
import { Container, Row, Col, Input, Button, ButtonGroup } from "reactstrap";
import { motion } from "framer-motion";
import CupcakeCard from "../components/CupcakeCard";
import { Cupcake } from "../types";
import { productApi } from "../services/api";
import { Search, SlidersHorizontal } from "lucide-react";
import useCartStore from "../store/useCartStore";
import toast from "react-hot-toast";

const Products = () => {
  const [products, setProducts] = useState<Cupcake[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"price" | "name">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await productApi.getAll();
        setProducts(data);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const compareValue =
        sortBy === "price" ? a.price - b.price : a.name.localeCompare(b.name);
      return sortOrder === "asc" ? compareValue : -compareValue;
    });

  const handleAddToCart = async (cupcake: Cupcake) => {
    try {
      await addToCart(cupcake._id, 1);
      toast.success("Added to cart!");
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
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Our Cupcakes</h1>
          <div className="d-flex gap-3">
            <div className="position-relative">
              <Input
                type="text"
                placeholder="Search cupcakes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pe-4 ps-4"
              />
              <Search
                className=" position-absolute top-50 end-2 translate-middle-y text-muted"
                size={20}
              />
            </div>
            <ButtonGroup>
              <Button
                color={sortBy === "name" ? "primary" : "light"}
                onClick={() => setSortBy("name")}
              >
                Name
              </Button>
              <Button
                color={sortBy === "price" ? "primary" : "light"}
                onClick={() => setSortBy("price")}
              >
                Price
              </Button>
            </ButtonGroup>
            <Button
              color="light"
              onClick={() =>
                setSortOrder((order) => (order === "asc" ? "desc" : "asc"))
              }
            >
              <SlidersHorizontal size={20} />
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <Row>
            {filteredProducts.map((cupcake) => (
              <Col
                key={cupcake._id}
                xs={12}
                sm={6}
                lg={4}
                xl={3}
                className="mb-4"
              >
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

export default Products;
