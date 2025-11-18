import type { BaseI } from '../base.interface';
import type { OrderItemI } from './order-item.interface';
import type { UserI } from './user.interface';

export interface OrderI extends BaseI {
  totalAmount: number;
  stripeSessionId?: string | null;
  userId: string;
  user: UserI;
  orderItems: OrderItemI[];
}
