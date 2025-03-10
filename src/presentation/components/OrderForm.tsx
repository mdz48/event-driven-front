// src/features/orders/presentation/components/OrderForm.tsx
import { useState, useRef } from 'react';
import { FormOrder } from '../../features/orders/domain/FormOrder';
import './OrderForm.css';
import { AxiosOrderRepository } from '../../features/orders/infrastructure/orders_repository';
import toast from 'react-hot-toast';
import { CreateOrderUseCase } from '../../features/orders/application/CreateOrderUseCase';



export const OrderForm = () => {
  const axiosOrderRepository = new AxiosOrderRepository();
  const createOrderUseCase = new CreateOrderUseCase(axiosOrderRepository);
  const tableIdRef = useRef(1)
  const productRef = useRef('')
  const quantityRef = useRef(0)
  const statusRef = useRef('pending')

  const [order, setOrder] = useState<FormOrder>({
    table_id: tableIdRef.current,
    product: productRef.current,
    quantity: quantityRef.current,
    status: statusRef.current
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOrder(prev => ({
      ...prev,
      [name]: name === 'table_id' || name === 'quantity' ? Number(value) : value
    }));
  };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Validar campos
        if (!order.table_id || !order.product || !order.quantity) {
            toast.error('Por favor completa todos los campos');
            return;
        }
        try {
        await createOrderUseCase.execute(order);
        toast.success('Pedido enviado correctamente');
        setOrder({ table_id: 1, product: '', quantity: 1, status: 'pending' });
        } catch (error) {
        console.error('Error al enviar el pedido:', error);
        toast.error('Error al enviar el pedido');
        }
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
        <button type="submit" className="submit-btn">Hacer Pedido</button>
      </form>
    </div>
  );
};