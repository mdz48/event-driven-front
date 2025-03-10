import React, { useState } from 'react';
import { OrderForm } from '../components/OrderForm';
import { FormOrder } from '../../features/orders/domain/FormOrder';
import { AxiosOrderRepository } from '../../features/orders/infrastructure/orders_repository';
import './Home.css';
import toast from 'react-hot-toast';
import { CreateOrderUseCase } from '../../features/orders/application/CreateOrderUseCase';

export const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const orderRepository = new AxiosOrderRepository();
  const createOrderUseCase = new CreateOrderUseCase(orderRepository);

  const handleSubmitOrder = async (order: FormOrder) => {
    try {
      setIsLoading(true);
      await createOrderUseCase.execute(order);
      toast.success('Pedido enviado correctamente');
    } catch (error) {
      console.error('Error al enviar el pedido:', error);
      toast.error('Error al enviar el pedido');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-header">
          <h1>Realiza tu Pedido</h1>
          <p>Completa el formulario para enviar tu orden a cocina</p>
        </div>
        <OrderForm onSubmit={handleSubmitOrder} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Home;