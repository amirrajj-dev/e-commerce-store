import type { BaseModel } from '../base.interface';
import type { OrderItem } from './order-item.interface';
import type { User } from './user.interface';

export interface Order extends BaseModel {
  totalAmount: number;
  stripeSessionId?: string | null;
  userId: string;
  user: User;
  orderItems: OrderItem[];
}
