// src/features/orders/application/GetAllOrdersUseCase.ts
import { Order } from "../domain/Order";
import { OrderRepository } from "../domain/OrderRepository";

export class GetAllOrdersUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(): Promise<Order[]> {
    try {
      return await this.orderRepository.getAll();
    } catch (error) {
      console.error('Error in GetAllOrdersUseCase:', error);
      return [];
    }
  }
}