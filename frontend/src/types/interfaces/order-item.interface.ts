import type { BaseI } from "../base.interface";
import type { OrderI } from "./order.interface";
import type { ProductI } from "./product.interface";

export interface OrderItemI extends BaseI {
  quantity: number;
  price: number;
  orderId: string;
  order: OrderI;
  productId: string;
  product: ProductI;
}
