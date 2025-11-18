import { Tag, Loader2 } from 'lucide-react';
import type{ CouponSectionProps } from '../types/types';

const CouponSection: React.FC<CouponSectionProps> = ({
  couponCode,
  setCouponCode,
  validatedCoupon,
  isApplyingCoupon,
  handleApplyCoupon,
  handleRemoveCoupon,
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Tag size={20} className="text-success" />
        <h3 className="font-semibold text-base-content">Apply Coupon</h3>
      </div>
      
      {validatedCoupon ? (
        <div className="alert alert-success flex justify-between items-center w-full">
            <div>
              <p className="font-semibold">Coupon Applied!</p>
              <p className="text-sm">{validatedCoupon.code} - {validatedCoupon.discountPercentage}% off</p>
            </div>
            <button
              onClick={handleRemoveCoupon}
              className="btn btn-sm"
            >
              ×
            </button>
          
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            className="input input-success focus:outline-none grow"
          />
          <button
            onClick={handleApplyCoupon}
            disabled={!couponCode.trim() || isApplyingCoupon}
            className="btn btn-soft btn-success"
          >
            {isApplyingCoupon ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              'Apply'
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default CouponSection;