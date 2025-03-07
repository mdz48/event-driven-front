import { Order } from "../domain/Order.ts";
import { OrderRepository } from "../domain/OrderRepository.ts";

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