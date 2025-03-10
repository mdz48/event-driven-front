// src/features/orders/infrastructure/OrdersRepository.ts
import axios from 'axios';
import { Order } from "../domain/Order";
import { FormOrder } from "../domain/FormOrder";
import { OrderRepository } from "../domain/OrderRepository";

const API_URL = 'http://44.223.253.69';
const API_CONSUMER = 'http://54.165.238.26:8080';

export class AxiosOrderRepository implements OrderRepository {
  async create(order: FormOrder): Promise<Order> {
    try {
      const response = await axios.post<Order>(`${API_URL}/orders/`, order);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  async getAll(): Promise<Order[]> {
    try {
      const response = await axios.get<Order[]>(`${API_URL}/orders/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  }

  async updateStatus(id: string, status: string): Promise<Order> {
    try {
      const response = await axios.put<Order>(`${API_CONSUMER}/orders/consumer/`, { id, status });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error('Pedido no encontrado');
        } else if (error.response?.status === 400) {
          throw new Error('Datos de estado inválidos');
        } else if (error.response?.status === 500) {
          throw new Error('Error de conexión con el servidor');
        }
      }
      throw new Error('Error al actualizar el estado del pedido');
    }
  }
}