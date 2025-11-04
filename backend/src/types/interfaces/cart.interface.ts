import type { BaseModel } from '../base.interface';
import type { Product } from './product.interface';
import type { User } from './user.interface';

export interface CartItem extends BaseModel {
  quantity: number;
  userId: string;
  user: User;
  productId: string;
  product: Product;
}
