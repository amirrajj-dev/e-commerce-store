import type { ProductI } from "../types/interfaces/product.interface";

export interface SignUpDto {
  name: string;
  email: string;
  password: string;
}

export interface SignInDto {
  email: string;
  password: string;
}

export interface CreateCartDto {
  productId: string;
}

export interface UpdateProductQuantityDto {
    quantity : number
}

export interface DeleteCartDto {
  productId: string;
}

export interface ValidateCouponDto {
  code: string;
}

export interface CreateCouponDto {
  code: string;
  discountPercentage: number;
  expirationDate: Date;
  userId: string;
}

export interface CreateCheckoutSessionDto {
  products: Pick<ProductI , 'id' | 'quantity' | 'price' | 'name' | 'image'>[];
  couponCode: string | null;
}

export interface CheckoutSuccess {
    sessionId : string
}

export interface CreateProductDto {
  name: string;
  image: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
}

export interface UpdateProductDto {
  name: string;
  image: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
}