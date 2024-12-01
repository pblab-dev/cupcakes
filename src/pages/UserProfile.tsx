import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Card,
  Button,
} from "reactstrap";
import { User, Address, Order } from "../types";
import ProfileForm from "../components/profile/ProfileForm";
import AddressForm from "../components/profile/AddressForm";
import OrderHistory from "../components/profile/OrderHistory";
import { userApi, orderApi } from "../services/api";
import toast from "react-hot-toast";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [userResponse, ordersResponse] = await Promise.all([
          userApi.getProfile(),
          orderApi.getAll(),
        ]);
        setUser(userResponse.data);
        setOrders(ordersResponse.data);
      } catch (error) {
        toast.error("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateProfile = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const handleAddAddress = (newAddress: Address) => {
    if (user) {
      setUser({
        ...user,
        addresses: [...user.addresses, newAddress],
      });
    }
  };

  if (loading || !user) {
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
    <Container className="py-5">
      <h1 className="mb-4">My Account</h1>
      <Row>
        <Col md={3}>
          <Nav vertical pills className="mb-4">
            <NavItem>
              <NavLink
                className={activeTab === "profile" ? "active" : ""}
                onClick={() => setActiveTab("profile")}
              >
                Profile
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === "addresses" ? "active" : ""}
                onClick={() => setActiveTab("addresses")}
              >
                Addresses
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === "orders" ? "active" : ""}
                onClick={() => setActiveTab("orders")}
              >
                Orders
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
        <Col md={9}>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="profile">
              <Card className="p-4">
                <h3 className="mb-4">Profile Information</h3>
                <ProfileForm user={user} onUpdate={handleUpdateProfile} />
              </Card>
            </TabPane>
            <TabPane tabId="addresses">
              <Card className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="mb-0">Addresses</h3>
                  <Button
                    color="primary"
                    onClick={() => setIsAddressModalOpen(true)}
                  >
                    Add New Address
                  </Button>
                </div>
                {user.addresses.map((address, index) => (
                  <div key={index} className="mb-3 p-3 border rounded">
                    <p className="mb-1">{address.street}</p>
                    <p className="mb-1">
                      {address.city}, {address.state} {address.zipCode}
                    </p>
                    <p className="mb-0">{address.country}</p>
                  </div>
                ))}
              </Card>
            </TabPane>
            <TabPane tabId="orders">
              <Card className="p-4">
                <h3 className="mb-4">Order History</h3>
                <OrderHistory orders={orders} />
              </Card>
            </TabPane>
          </TabContent>
        </Col>
      </Row>
      <AddressForm
        isOpen={isAddressModalOpen}
        toggle={() => setIsAddressModalOpen(!isAddressModalOpen)}
        onAddAddress={handleAddAddress}
      />
    </Container>
  );
};

export default UserProfile;
