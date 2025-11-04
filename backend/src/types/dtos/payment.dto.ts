import type { Product } from '../interfaces/product.interface';

export interface CreateCheckoutSessionDto {
  products: Product[];
  couponCode: string;
}
