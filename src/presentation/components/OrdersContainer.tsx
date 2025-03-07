// src/features/orders/presentation/containers/OrdersContainer.tsx
import { useState, useEffect } from 'react';
import { OrderForm } from '../components/OrderForm';
import {List} from "./List.tsx";
import { FormOrder} from "../../features/orders/domain/FormOrder.ts";
import { Order} from "../../features/orders/domain/Order.ts";
import { CreateOrderUseCase} from "../../features/orders/application/CreateOrderUseCase.ts";
import { GetAllOrdersUseCase} from "../../features/orders/domain/GetAllOrdersUseCase.ts";
import { AxiosOrderRepository} from "../../features/orders/infrastructure/orders_repository.ts";

// Create repository and use cases instances
const orderRepository = new AxiosOrderRepository();
const createOrderUseCase = new CreateOrderUseCase(orderRepository);
const getAllOrdersUseCase = new GetAllOrdersUseCase(orderRepository);

export const OrdersContainer = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState<boolean>(false);
  const [creatingOrder, setCreatingOrder] = useState<boolean>(false);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const fetchedOrders = await getAllOrdersUseCase.execute();
      setOrders(fetchedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleCreateOrder = async (orderData: FormOrder) => {
    setCreatingOrder(true);
    try {
      const newOrder = await createOrderUseCase.execute(orderData);
      setOrders(prev => [...prev, newOrder]);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order');
    } finally {
      setCreatingOrder(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h1>Restaurant Order Management</h1>
      <div className="orders-layout">
        <OrderForm onSubmit={handleCreateOrder} isLoading={creatingOrder} />
        <List orders={orders} isLoading={loadingOrders} />
      </div>
    </div>
  );
};