import { Order } from "./Order";
import { FormOrder } from "./FormOrder";

export interface OrderRepository {
  create(order: FormOrder): Promise<Order>;
  getAll(): Promise<Order[]>;
  updateStatus(id: string, status: string): Promise<Order>;
}