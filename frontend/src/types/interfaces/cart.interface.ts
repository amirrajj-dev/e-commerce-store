import type { BaseI } from "../base.interface";
import type { ProductI } from "./product.interface";
import type { UserI } from "./user.interface";

export interface CartItemI extends BaseI {
  quantity: number;
  userId: string;
  user: UserI;
  productId: string;
  product: ProductI;
}
