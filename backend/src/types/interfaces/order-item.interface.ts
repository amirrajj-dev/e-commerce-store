import type { BaseModel } from '../base.interface';
import type { Order } from './order.interface';
import type { Product } from './product.interface';

export interface OrderItem extends BaseModel {
  quantity: number;
  price: number;
  orderId: string;
  order: Order;
  productId: string;
  product: Product;
}
