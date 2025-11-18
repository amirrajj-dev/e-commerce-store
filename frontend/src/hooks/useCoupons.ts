import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../stores/hook";
import {
  getCoupon,
  validateCoupon,
  createCoupon,
} from "../stores/reducers/coupons/coupons.thunks";
import {
  clearCouponsError,
  clearValidatedCoupon,
  clearUserCoupon,
  setValidatedCoupon,
  removeAppliedCoupon,
} from "../stores/reducers/coupons/coupons.slice";
import type { CouponI, ValidatedCouponI } from "../types/interfaces/coupon.interface";
import type { CreateCouponDto } from "../utils/dtos";

export const useCoupons = () => {
  const dispatch = useAppDispatch();
  const coupons = useAppSelector((state) => state.coupons);

  const fetchUserCoupon = useCallback(() => {
    dispatch(getCoupon());
  }, [dispatch]);

  const validateCouponCode = useCallback(
    async (code: string) => {
      await dispatch(validateCoupon({ code })).unwrap();
      return { isValid: true, code };
    },
    [dispatch]
  );

  const createNewCoupon = useCallback(
    async (couponData: CreateCouponDto) => {
      const result = await dispatch(createCoupon(couponData)).unwrap();
      return result;
    },
    [dispatch]
  );

  const removeAppliedCouponFromCart = useCallback(() => {
    dispatch(removeAppliedCoupon());
  }, [dispatch]);

  const clearErrors = useCallback(() => {
    dispatch(clearCouponsError());
  }, [dispatch]);

  const clearValidation = useCallback(() => {
    dispatch(clearValidatedCoupon());
  }, [dispatch]);

  const clearUserCouponData = useCallback(() => {
    dispatch(clearUserCoupon());
  }, [dispatch]);

  const manuallySetCoupon = useCallback(
    (coupon: CouponI | null) => {
      dispatch(setValidatedCoupon(coupon));
    },
    [dispatch]
  );

  const calculateDiscount = useCallback(
    (totalAmount: number, coupon?: ValidatedCouponI | null) => {
      const activeCoupon = coupon || coupons.validatedCoupon;
      if (!activeCoupon) return 0;
      return (totalAmount * activeCoupon.discountPercentage) / 100;
    },
    [coupons.validatedCoupon]
  );

  const getFinalAmount = useCallback(
    (totalAmount: number, coupon?: CouponI | null) => {
      const discount = calculateDiscount(totalAmount, coupon);
      return totalAmount - discount;
    },
    [calculateDiscount]
  );

  return {
    ...coupons,
    fetchUserCoupon,
    validateCouponCode,
    createNewCoupon,
    removeAppliedCouponFromCart,
    clearErrors,
    clearValidation,
    clearUserCouponData,
    manuallySetCoupon,
    calculateDiscount,
    getFinalAmount,
    hasValidCoupon: !!coupons.validatedCoupon,
    discountPercentage: coupons.validatedCoupon?.discountPercentage || 0,
  };
};
