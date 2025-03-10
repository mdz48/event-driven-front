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
          <select
            id="table_id"
            name="table_id"
            value={order.table_id}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una mesa</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="product">Productos:</label>
          <select
            id="product"
            name="product"
            value={order.product}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un producto</option>
            <option value="Pizza">Pizza</option>
            <option value="Hamburguesa">Hamburguesa</option>
            <option value="Hot Dog">Hot Dog</option>
            <option value="Papas Fritas">Papas Fritas</option>
          </select>
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