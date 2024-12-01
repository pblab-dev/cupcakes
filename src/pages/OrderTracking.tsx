import React from 'react';
import { Container, Table, Badge } from 'reactstrap';
import { Order } from '../types';

const OrderTracking = () => {
  const orders: Order[] = [
    // Add mock orders here
  ];

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'processing':
        return 'info';
      case 'shipped':
        return 'primary';
      case 'delivered':
        return 'success';
      default:
        return 'secondary';
    }
  };

  return (
    <Container>
      <h1 className="mb-4">Order Tracking</h1>
      <Table responsive>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>{new Date(order.date).toLocaleDateString()}</td>
              <td>${order.total.toFixed(2)}</td>
              <td>
                <Badge color={getStatusColor(order.status)}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </td>
              <td>
                <a href={`/orders/${order.id}`} className="text-decoration-none">
                  View Details
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default OrderTracking;