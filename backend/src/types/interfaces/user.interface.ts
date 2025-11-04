import type { BaseModel } from '../base.interface';

import type { CartItem } from './cart.interface';
import type { Coupon } from './coupon.interface';
import type { Order } from './order.interface';

export interface User extends BaseModel {
  name: string;
  email: string;
  password: string;
  role: 'CUSTOMER' | 'ADMIN';
  cartItems: CartItem[];
  orders: Order[];
  coupon?: Coupon | null;
}

export interface SignedUpUser extends Omit<User, 'password' | 'cartItems' | 'orders' | 'coupon'> {}

export interface UserWithCart extends Omit<User, 'password' | 'orders' | 'coupon'> {}
