import { useState, useEffect } from "react";
import { useCart } from "../../../hooks/useCart";
import { useCoupons } from "../../../hooks/useCoupons";
import { toast } from "sonner";
import CartHeader from "./ui/CartHeader";
import CartItemsSection from "./ui/CartItemSection";
import OrderSummary from "./ui/OrderSumary";
import PeopleAlsoBought from "./ui/peopleAlsoBought/PeopleAlsoBought";
import LoadingState from "../../common/LoadingState";

const Cart = () => {
  const {
    items,
    isLoading,
    isAdding,
    isRemoving,
    updateQuantity,
    removeFromCart,
    totalPrice,
    totalItems,
    error: cartError,
  } = useCart();

  const {
    calculateDiscount,
    getFinalAmount,
    userCoupon,
    fetchUserCoupon,
    validateCouponCode,
    removeAppliedCouponFromCart,
    validatedCoupon,
    isLoading: isLoadingCoupon,
    error: couponError,
  } = useCoupons();

  const [couponCode, setCouponCode] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  useEffect(()=>{
    fetchUserCoupon()
  } , [fetchUserCoupon])

  useEffect(()=>{
    if (userCoupon){
      setCouponCode(userCoupon.code)
    }
  } , [userCoupon])

  useEffect(() => {
    if (cartError || couponError) {
      toast.error(cartError || couponError || "Something Gose Wrong");
    }
  }, [cartError, couponError]);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    setIsApplyingCoupon(true);

    try {
      await validateCouponCode(couponCode);
      setCouponCode("");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Invalid coupon code"
      );
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    removeAppliedCouponFromCart();
  };

  const handleQuantityChange = async (
    productId: string,
    newQuantity: number
  ) => {
    if (newQuantity < 1) return;

    try {
      await updateQuantity(productId, newQuantity);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update quantity"
      );
    }
  };

  const handleRemoveItem = async (productId: string) => {
    try {
      await removeFromCart(productId);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to remove item"
      );
    }
  };

  const discountAmount = validatedCoupon ? calculateDiscount(totalPrice) : 0;
  const finalPrice = getFinalAmount(totalPrice);

  if (isLoading) {
    return <LoadingState txt="Loading your cart..." />;
  }

  const cartProps = {
    items,
    totalItems,
    totalPrice,
    isAdding,
    isRemoving,
    handleQuantityChange,
    handleRemoveItem,
  };

  const couponProps = {
    couponCode,
    setCouponCode,
    validatedCoupon,
    isApplyingCoupon: isApplyingCoupon || isLoadingCoupon,
    handleApplyCoupon,
    handleRemoveCoupon,
    discountAmount,
    finalPrice,
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <CartHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <CartItemsSection {...cartProps} />
        <OrderSummary {...cartProps} {...couponProps} />
      </div>
      <PeopleAlsoBought />
    </div>
  );
};

export default Cart;