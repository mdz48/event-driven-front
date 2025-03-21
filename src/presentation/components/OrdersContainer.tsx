import { useState, useEffect } from 'react';
import './OrdersContainer.css';
import { Order } from '../../features/orders/domain/Order';
import { AxiosOrderRepository } from '../../features/orders/infrastructure/orders_repository';
import toast from 'react-hot-toast';
import { UpdateOrderStatus } from '../../features/orders/application/UpdateOrderUseCase';
import { GetAllOrdersUseCase } from '../../features/orders/application/GetAllOrdersUseCase';

export const OrdersContainer = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const orderRepository = new AxiosOrderRepository();
  const updateOrderUseCase = new UpdateOrderStatus(orderRepository);
  const getAllOrdersUseCase = new GetAllOrdersUseCase(orderRepository)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await getAllOrdersUseCase.execute();
        setOrders(orders);
      } catch (error) {
        console.error('Error al obtener pedidos:', error);
        toast.error('Ocurrió un error al obtener los pedidos');
      }
    }
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      const updatedOrder = await updateOrderUseCase.execute(orderId, newStatus);
      setOrders(orders.map(order => (order.id === updatedOrder.id ? updatedOrder : order)));
      toast.success('Estado actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      toast.error('Error al actualizar el estado del pedido');
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