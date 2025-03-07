// src/features/orders/infrastructure/OrdersRepository.ts
import axios from 'axios';
import { Order } from "../domain/Order";
import { FormOrder } from "../domain/FormOrder";
import { OrderRepository } from "../domain/OrderRepository";

const API_URL = 'http://localhost:8080';

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
}