import React, { useState } from 'react';
import { OrderForm } from '../components/OrderForm';
import { FormOrder } from '../../features/orders/domain/FormOrder';
import { AxiosOrderRepository } from '../../features/orders/infrastructure/orders_repository';
import './Home.css';

export const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const orderRepository = new AxiosOrderRepository();

  const handleSubmitOrder = async (order: FormOrder) => {
    try {
      setIsLoading(true);
      // Usar el repositorio para crear la orden
      await orderRepository.create(order);
      alert('¡Pedido enviado con éxito!');
    } catch (error) {
      console.error('Error al enviar el pedido:', error);
      alert('Error al enviar pedido. Por favor, intenta nuevamente.');
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