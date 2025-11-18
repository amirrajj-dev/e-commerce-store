import { createAsyncThunk } from "@reduxjs/toolkit";
import { couponApi } from "../../../utils/api";
import api from "../../../utils/axios";
import type { ValidateCouponDto, CreateCouponDto } from "../../../utils/dtos";

export const getCoupon = createAsyncThunk(
  "coupons/getCoupon",
  async (_, { rejectWithValue }) => {
    try {
      const response = await couponApi.getCoupon(api);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch coupon"
      );
    }
  }
);

export const validateCoupon = createAsyncThunk(
  "coupons/validateCoupon",
  async (couponData: ValidateCouponDto, { rejectWithValue }) => {
    try {
      const response = await couponApi.validateCoupon(api, couponData);
      return response.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to validate coupon"
      );
    }
  }
);

export const createCoupon = createAsyncThunk(
  "coupons/createCoupon",
  async (couponData: CreateCouponDto, { rejectWithValue }) => {
    try {
      const response = await couponApi.createCoupon(api, couponData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create coupon"
      );
    }
  }
);
