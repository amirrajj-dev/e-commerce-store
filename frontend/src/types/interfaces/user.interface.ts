import type { BaseI } from "../base.interface";
import type { CartItemI } from "./cart.interface";
import type { CouponI } from "./coupon.interface";
import type { OrderI } from "./order.interface";

export interface UserI extends BaseI {
  name: string;
  email: string;
  role: 'CUSTOMER' | 'ADMIN';
  cartItems: CartItemI[];
  orders: OrderI[];
  coupon?: CouponI | null;
}

