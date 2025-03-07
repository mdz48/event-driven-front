// src/features/orders/presentation/components/OrderList.tsx
import { Order} from "../../features/orders/domain/Order.ts";

interface OrderListProps {
  orders: Order[];
  isLoading: boolean;
}

export const List = ({ orders, isLoading }: OrderListProps) => {
  if (isLoading) {
    return <div className="orders-loading">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return <div className="no-orders">No orders found</div>;
  }

  return (
    <div className="orders-list-container">
      <h2>Orders</h2>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-item">
            <div className="order-header">
              <h3>Order #{order.id}</h3>
              <span className={`status ${order.status}`}>{order.status}</span>
            </div>
            <div className="order-details">
              <p><strong>Table:</strong> {order.table_id}</p>
              <p><strong>Products:</strong> {order.product}</p>
              <p><strong>Quantity:</strong> {order.quantity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};