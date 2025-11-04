import type { BaseModel } from '../base.interface';
import type { CartItem } from './cart.interface';
import type { OrderItem } from './order-item.interface';

export interface Product extends BaseModel {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
  isFeatured: boolean;
  cartItems: CartItem[];
  orderItems: OrderItem[];
}
