import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { Cupcake } from "../types";

interface CupcakeCardProps {
  cupcake: Cupcake;
  onAddToCart: (cupcake: Cupcake) => void;
}

const CupcakeCard: React.FC<CupcakeCardProps> = ({ cupcake, onAddToCart }) => {
  const navigate = useNavigate();

  return (
    <Card className="h-100 shadow-sm hover-shadow">
      <CardImg
        top
        src={cupcake.image}
        alt={cupcake.name}
        style={{ height: "200px", objectFit: "cover" }}
        onClick={() => navigate(`/product/${cupcake._id}`)}
        className="cursor-pointer"
      />
      <CardBody>
        <CardTitle tag="h5">{cupcake.name}</CardTitle>
        <CardText className="text-muted">${cupcake.price.toFixed(2)}</CardText>
        <Button color="primary" block onClick={() => onAddToCart(cupcake)}>
          Add to Cart
        </Button>
      </CardBody>
    </Card>
  );
};

export default CupcakeCard;
