import { OrderRepository } from "../domain/OrderRepository";
import { Order } from "../domain/Order";

export class UpdateOrderStatus {
    constructor(private orderRepository: OrderRepository) {}

    async execute(orderId: string, newStatus: string): Promise<Order> {
        try {
            return await this.orderRepository.updateStatus(orderId, newStatus);
        } catch (error) {
            console.error('Error en usecase:', error);
            throw error;
        }
    }
}