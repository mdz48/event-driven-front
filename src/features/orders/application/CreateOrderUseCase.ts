import { Order } from "../domain/Order";
import { FormOrder } from "../domain/FormOrder";
import { OrderRepository } from "../domain/OrderRepository";

export class CreateOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(order: FormOrder): Promise<Order> {
    try {
      return await this.orderRepository.create(order);
    } catch (error) {
      console.error('Error in CreateOrderUseCase:', error);
      throw error;
    }
  }
}