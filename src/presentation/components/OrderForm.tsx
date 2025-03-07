// src/features/orders/presentation/components/OrderForm.tsx
import { useState } from 'react';
import { FormOrder } from '../../features/orders/domain/FormOrder';
import './OrderForm.css';

interface OrderFormProps {
  onSubmit: (order: FormOrder) => Promise<void>;
  isLoading: boolean;
}

export const OrderForm = ({ onSubmit, isLoading }: OrderFormProps) => {
  const [order, setOrder] = useState<FormOrder>({
    table_id: 1,
    product: '',
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
      table_id: 1,
      product: '',
      quantity: 1,
      status: 'pending'
    });
  };

  return (
    <div className="order-form-container">
      <h2>Nuevo Pedido</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="table_id">Número de Mesa:</label>
          <input
            type="number"
            id="table_id"
            name="table_id"
            value={order.table_id}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="product">Productos:</label>
          <input
            type="text"
            id="product"
            name="product"
            value={order.product}
            onChange={handleChange}
            placeholder="Ej: Hamburguesa, Papas fritas, etc."
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Cantidad:</label>
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
        <button type="submit" disabled={isLoading} className="submit-btn">
          {isLoading ? 'Enviando...' : 'Enviar Pedido'}
        </button>
      </form>
    </div>
  );
};