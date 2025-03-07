import React, { useState, useEffect } from 'react';
import './OrdersContainer.css';
import { Order } from '../../features/orders/domain/Order';
import { AxiosOrderRepository } from '../../features/orders/infrastructure/orders_repository';

export const OrdersContainer = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  // Crear una instancia del repositorio
  const orderRepository = new AxiosOrderRepository();

  useEffect(() => {
    // Función para cargar los pedidos
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await orderRepository.getAll();
        setOrders(fetchedOrders);
      } catch (error) {
        console.error('Error al cargar pedidos:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      // Usar el método del repositorio para actualizar el estado
      await orderRepository.updateStatus(orderId, newStatus);

      // Actualizar el estado local después de la actualización exitosa
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error('Error al actualizar el estado del pedido:', error);
      alert('No se pudo actualizar el estado del pedido. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div className="orders-container">
      {orders.length === 0 ? (
        <div className="no-orders">
          <i className="no-orders-icon">📋</i>
          <p>No hay pedidos pendientes</p>
        </div>
      ) : (
        <div className="orders-grid">
          {orders.map(order => (
            <div className={`order-card ${(order.status)}`} key={order.id}>
              <div className="order-details">
                <p className="order-product">{order.product}</p>
                <p className="order-quantity">Cantidad: {order.quantity}</p>
              </div>
              <div className="order-status">
                {/* Mostrar el status exactamente como viene de la API */}
                <span className={`status-badge ${(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <div className="order-actions">
                {order.status === 'pending' && (
                  <button
                    className="btn btn-start"
                    onClick={() => handleUpdateStatus(order.id, 'in-progress')}
                  >
                    Iniciar preparación
                  </button>
                )}
                {order.status === 'in-progress' && (
                  <button
                    className="btn btn-ready"
                    onClick={() => handleUpdateStatus(order.id, 'ready')}
                  >
                    Marcar como listo
                  </button>
                )}
                {order.status === 'ready' && (
                  <button
                    className="btn btn-complete"
                    onClick={() => handleUpdateStatus(order.id, 'completed')}
                  >
                    Completar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};