import { createSlice } from "@reduxjs/toolkit";
import type {
  CouponI,
  ValidatedCouponI,
} from "../../../types/interfaces/coupon.interface";
import { getCoupon, validateCoupon, createCoupon } from "./coupons.thunks";

interface CouponsState {
  userCoupon: CouponI | null;
  validatedCoupon: ValidatedCouponI | null;
  isLoading: boolean;
  isValidating: boolean;
  isCreating: boolean;
  error: string | null;
  validationError: string | null;
  lastValidatedCode: string | null;
}

const initialState: CouponsState = {
  userCoupon: null,
  validatedCoupon: null,
  isLoading: false,
  isValidating: false,
  isCreating: false,
  error: null,
  validationError: null,
  lastValidatedCode: null,
};

export const couponsSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {
    clearCouponsError: (state) => {
      state.error = null;
      state.validationError = null;
    },
    clearValidatedCoupon: (state) => {
      state.validatedCoupon = null;
      state.validationError = null;
      state.lastValidatedCode = null;
    },
    clearUserCoupon: (state) => {
      state.userCoupon = null;
    },
    setValidatedCoupon: (state, action: { payload: CouponI | null }) => {
      state.validatedCoupon = action.payload;
      state.validationError = null;
    },
    applyCoupon: (state, action: { payload: ValidatedCouponI }) => {
      state.validatedCoupon = action.payload;
    },
    removeAppliedCoupon: (state) => {
      state.validatedCoupon = null;
      state.lastValidatedCode = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Coupon
      .addCase(getCoupon.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userCoupon = action.payload as CouponI;
        state.error = null;
      })
      .addCase(getCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Validate Coupon
      .addCase(validateCoupon.pending, (state) => {
        state.isValidating = true;
        state.validationError = null;
      })
      .addCase(validateCoupon.fulfilled, (state, action) => {
        state.isValidating = false;

        // CouponI object from the validation response
        const validatedCouponData: ValidatedCouponI = {
          code: action?.payload!.code,
          discountPercentage: action?.payload!.percent,
          isActive: action?.payload!.isValid,
          expirationDate: new Date(),
        };

        state.validatedCoupon = validatedCouponData;
        state.lastValidatedCode = action?.payload!.code;
        state.validationError = null;
      })
      .addCase(validateCoupon.rejected, (state, action) => {
        state.isValidating = false;
        state.validationError = action.payload as string;
        state.validatedCoupon = null;
        state.lastValidatedCode = null;
      })

      // Create Coupon
      .addCase(createCoupon.pending, (state) => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.isCreating = false;
        state.userCoupon = action.payload as CouponI;
        state.error = null;
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearCouponsError,
  clearValidatedCoupon,
  clearUserCoupon,
  setValidatedCoupon,
  applyCoupon,
  removeAppliedCoupon,
} = couponsSlice.actions;

export default couponsSlice.reducer;
