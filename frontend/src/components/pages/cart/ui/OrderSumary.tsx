import { motion } from "framer-motion";
import { ArrowRight, Check, CircleX, Loader2, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import type { OrderSummaryProps } from "../types/types";
import CouponSection from "./CouponSection";
import PriceBreakdown from "./PriceBreakDown";
import { usePayments } from "../../../../hooks/usePayments";
import { useEffect } from "react";

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  totalItems,
  totalPrice,
  validatedCoupon,
  discountAmount,
  finalPrice,
  couponCode,
  setCouponCode,
  isApplyingCoupon,
  handleApplyCoupon,
  handleRemoveCoupon,
}) => {
  const { 
    initiateCheckout, 
    isLoading, 
    checkoutSession, 
    error: paymentError 
  } = usePayments();

  // Redirect to Stripe Checkout when session is created
  useEffect(() => {
    if (checkoutSession?.url) {
      window.location.href = checkoutSession.url;
    }
  }, [checkoutSession]);

  const handlePayment = async () => {
    if (items.length === 0) return;

    try {
      // Prepare products data for checkout
      const lineItems = items.map(item => ({
        id: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
        name: item.product.name,
        image: item.product.image,
      }));

      const checkoutData = {
        products: lineItems,
        couponCode: validatedCoupon?.code || null,
      };
      
      // create the checkout session
    await initiateCheckout(checkoutData);
      
    } catch (error) {
      console.error('Payment initiation failed:', error);
    }
  };

  return (
    <div className="lg:col-span-1">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-base-100 rounded-2xl shadow-lg p-6 sticky top-8"
      >
        <h2 className="text-2xl font-semibold text-base-content mb-6">
          Order Summary
        </h2>

        {/* Payment Error Display */}
        {paymentError && (
          <div className="alert alert-error mb-4">
            <CircleX />
            <span>{paymentError}</span>
          </div>
        )}

        <CouponSection
          couponCode={couponCode}
          setCouponCode={setCouponCode}
          validatedCoupon={validatedCoupon}
          isApplyingCoupon={isApplyingCoupon}
          handleApplyCoupon={handleApplyCoupon}
          handleRemoveCoupon={handleRemoveCoupon}
        />

        <PriceBreakdown
          totalItems={totalItems}
          totalPrice={totalPrice}
          validatedCoupon={validatedCoupon}
          discountAmount={discountAmount}
          finalPrice={finalPrice}
        />

        {/* Checkout Button */}
        <button
          onClick={handlePayment}
          disabled={items.length === 0 || isLoading}
          className="btn btn-success btn-lg w-full gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Proceed to Checkout
              <ArrowRight size={20} />
            </>
          )}
        </button>

        {/* Continue Shopping */}
        <Link
          to={"/"}
          className="btn btn-success btn-soft w-full mt-4"
        >
          Continue Shopping
        </Link>

        {/* Security Badges */}
        <div className="mt-6 pt-6 border-t border-base-300">
          <div className="flex justify-center items-center gap-4 text-base-content/60">
            <div className="flex items-center gap-2">
              <Lock size={14} />
              <span className="text-sm">Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={16} />
              <span className="text-sm">SSL Encrypted</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSummary;