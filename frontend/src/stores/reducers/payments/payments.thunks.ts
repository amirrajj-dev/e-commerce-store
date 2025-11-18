import { createAsyncThunk } from "@reduxjs/toolkit";
import { paymentApi } from "../../../utils/api";
import api from "../../../utils/axios";
import type { 
  CreateCheckoutSessionDto,
  CheckoutSuccess
} from "../../../utils/dtos";

export const createCheckoutSession = createAsyncThunk(
  "payments/createCheckoutSession",
  async (checkoutData: CreateCheckoutSessionDto, { rejectWithValue }) => {
    try {
      const response = await paymentApi.createCheckoutSession(api, checkoutData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create checkout session"
      );
    }
  }
);

export const processCheckoutSuccess = createAsyncThunk(
  "payments/processCheckoutSuccess",
  async (successData: CheckoutSuccess, { rejectWithValue }) => {
    try {
      const response = await paymentApi.checkoutSuccess(api, successData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to process checkout success"
      );
    }
  }
);