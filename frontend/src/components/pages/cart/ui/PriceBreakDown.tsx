import type{ PriceBreakdownProps } from '../types/types';

const PriceBreakdown: React.FC<PriceBreakdownProps> = ({
  totalItems,
  totalPrice,
  validatedCoupon,
  discountAmount,
  finalPrice,
}) => {
  return (
    <div className="space-y-3 mb-6">
      <div className="flex justify-between text-base-content">
        <span>Subtotal ({totalItems} items)</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
      
      {validatedCoupon && (
        <div className="flex justify-between text-success">
          <span>Discount ({validatedCoupon.discountPercentage}%)</span>
          <span>-${discountAmount.toFixed(2)}</span>
        </div>
      )}

      <div className="border-t border-base-300 pt-3">
        <div className="flex justify-between text-lg font-bold text-base-content">
          <span>Total</span>
          <span>${finalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceBreakdown;