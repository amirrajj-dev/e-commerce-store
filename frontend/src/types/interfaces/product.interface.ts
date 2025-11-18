import type { BaseI } from "../base.interface";
import type { CartItemI } from "./cart.interface";
import type { OrderItemI } from "./order-item.interface";

export interface ProductI extends BaseI {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
  isFeatured: boolean;
  cartItems: CartItemI[];
  orderItems: OrderItemI[];
}
