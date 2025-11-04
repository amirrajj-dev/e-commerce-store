import type { BaseModel } from '../base.interface';
import type { User } from './user.interface';

export interface Coupon extends BaseModel {
  code: string;
  discountPercentage: number;
  expirationDate: Date;
  isActive: boolean;
  userId: string;
  user: User;
}
