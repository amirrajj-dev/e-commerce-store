export interface ValidateCouponDto {
  code: string;
}

export interface CreateCouponDto {
  code: string;
  discountPercentage: number;
  expirationDate: Date;
  userId: string;
}
