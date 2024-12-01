import React from "react";
import { Table, Badge } from "reactstrap";
import { Order } from "../../types";
import { formatDate } from "../../utils/dateUtils";

interface OrderHistoryProps {
  orders: Order[];
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders }) => {
  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "warning";
      case "processing":
        return "info";
      case "shipped":
        return "primary";
      case "delivered":
        return "success";
      default:
        return "secondary";
    }
  };

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Date</th>
          <th>Items</th>
          <th>Total</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order: any) => (
          <tr key={order.id}>
            <td>#{order.id}</td>
            <td>
              {order.createdAt ? formatDate(order.createdAt) : "Invalid date"}
            </td>
            <td>
              {order.items.map((item: any) => (
                <div key={item.product._id}>
                  {item.quantity}x {item.product.name}
                </div>
              ))}
            </td>
            <td>${order.total.toFixed(2)}</td>
            <td>
              <Badge color={getStatusColor(order.status)}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default OrderHistory;
