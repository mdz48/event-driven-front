import React from 'react';
import { OrdersContainer } from "../components/OrdersContainer";
import './Kitchen.css';

export const Kitchen = () => {
  return (
    <div className="kitchen-container">
      <div className="kitchen-header">
        <h1>Panel de Cocina</h1>
        <p>Administra y actualiza el estado de los pedidos</p>
      </div>
      <OrdersContainer />
    </div>
  );
};

export default Kitchen;