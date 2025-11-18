import type { BaseI } from "../base.interface";

export interface CouponI extends BaseI {
  code: string;
  discountPercentage: number;
  expirationDate: Date;
  isActive: boolean;
  userId: string;
  user: any;
}

export interface ValidatedCouponI {
  code: string;
  discountPercentage: number;
  isActive: boolean;
  expirationDate: Date;
}