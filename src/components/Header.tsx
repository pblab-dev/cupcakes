import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  Badge,
  Collapse,
  NavbarToggler,
} from "reactstrap";
import { ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";
import useCartStore from "../store/useCartStore";
import useAuthStore from "../store/useAuthStore";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { items } = useCartStore();
  const { isAuthenticated, logout } = useAuthStore();

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Navbar color="light" light expand="md" className="px-4 shadow-sm">
      <NavbarBrand tag={Link} to="/" className="d-flex align-items-center">
        <img
          src="https://originalcupcakes.com/wp-content/uploads/2015/08/cupcakes_BFD_logo_new2.png"
          alt="Sweet Delights"
          height="40"
          className="me-2"
        />
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/products">
              Products
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/promotions">
              Promotions
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/recommended">
              Recommended
            </NavLink>
          </NavItem>
        </Nav>
        <Nav navbar>
          <NavItem className="me-3">
            <NavLink tag={Link} to="/cart" className="position-relative">
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <Badge
                  color="danger"
                  pill
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {cartItemCount}
                </Badge>
              )}
            </NavLink>
          </NavItem>
          <NavItem>
            {isAuthenticated ? (
              <div className="d-flex gap-2">
                <Button color="light" tag={Link} to="/profile">
                  <User size={20} className="me-2" />
                  Profile
                </Button>
                <Button color="outline-primary" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Button color="primary" tag={Link} to="/login">
                <User size={20} className="me-2" />
                Login
              </Button>
            )}
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
