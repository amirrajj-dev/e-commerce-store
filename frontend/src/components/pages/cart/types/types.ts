import type { CartItemI } from '../../../../types/interfaces/cart.interface';
import type { ValidatedCouponI } from '../../../../types/interfaces/coupon.interface';

export interface CartItemProps {
  item: CartItemI;
  index: number;
  isAdding: boolean;
  isRemoving: boolean;
  onQuantityChange: (productId: string, newQuantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

export interface CartItemsSectionProps {
  items: CartItemI[];
  totalItems: number;
  isAdding: boolean;
  isRemoving: boolean;
  handleQuantityChange: (productId: string, newQuantity: number) => void;
  handleRemoveItem: (productId: string) => void;
}

export interface CouponSectionProps {
  couponCode: string;
  setCouponCode: (code: string) => void;
  validatedCoupon: ValidatedCouponI | null;
  isApplyingCoupon: boolean;
  handleApplyCoupon: () => void;
  handleRemoveCoupon: () => void;
}

export interface PriceBreakdownProps {
  totalItems: number;
  totalPrice: number;
  validatedCoupon: ValidatedCouponI | null;
  discountAmount: number;
  finalPrice: number;
}

export interface OrderSummaryProps extends CartItemsSectionProps, CouponSectionProps, PriceBreakdownProps {}