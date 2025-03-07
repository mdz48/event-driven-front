// src/features/orders/presentation/components/OrderForm.tsx
import { useState } from 'react';
import { FormOrder} from "../../features/orders/domain/FormOrder.ts";

interface OrderFormProps {
  onSubmit: (order: FormOrder) => Promise<void>;
  isLoading: boolean;
}

export const OrderForm = ({ onSubmit, isLoading }: OrderFormProps) => {
  const [order, setOrder] = useState<FormOrder>({
    table_id: 0,
    products: '',
    quantity: 1,
    status: 'pending'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOrder(prev => ({
      ...prev,
      [name]: name === 'table_id' || name === 'quantity' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(order);
    setOrder({
      table_id: 0,
      products: '',
      quantity: 1,
      status: 'pending'
    });
  };

  return (
    <div className="order-form-container">
      <h2>Create New Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="table_id">Table Number:</label>
          <input
            type="number"
            id="table_id"
            name="table_id"
            value={order.table_id}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="products">Products:</label>
          <input
            type="text"
            id="products"
            name="products"
            value={order.products}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={order.quantity}
            onChange={handleChange}
            min="1"
            required
          />
        </div>  
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Order'}
        </button>
      </form>
    </div>
  );
};