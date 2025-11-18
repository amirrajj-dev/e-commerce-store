import { createSlice } from "@reduxjs/toolkit";
import {
  createCheckoutSession,
  processCheckoutSuccess,
} from "./payments.thunks";

interface CheckoutSession {
  id: string;
  totalAmount: number;
  url: string;
}

interface Order {
  orderId: string;
  totalAmount: number;
  status: string;
  createdAt?: string;
}

interface PaymentsState {
  checkoutSession: CheckoutSession | null;
  currentOrder: Order | null;
  isLoading: boolean;
  isProcessing: boolean;
  error: string | null;
  successMessage: string | null;
  redirectUrl: string | null;
}

const initialState: PaymentsState = {
  checkoutSession: null,
  currentOrder: null,
  isLoading: false,
  isProcessing: false,
  error: null,
  successMessage: null,
  redirectUrl: null,
};

export const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    clearPaymentsError: (state) => {
      state.error = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
    clearCheckoutSession: (state) => {
      state.checkoutSession = null;
      state.redirectUrl = null;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    setRedirectUrl: (state, action: { payload: string | null }) => {
      state.redirectUrl = action.payload;
    },
    resetPaymentState: (state) => {
      state.checkoutSession = null;
      state.currentOrder = null;
      state.isLoading = false;
      state.isProcessing = false;
      state.error = null;
      state.successMessage = null;
      state.redirectUrl = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Checkout Session
      .addCase(createCheckoutSession.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createCheckoutSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.checkoutSession = action.payload as CheckoutSession;
        state.error = null;
        if (action?.payload?.url) {
          state.redirectUrl = action.payload.url;
        }
      })
      .addCase(createCheckoutSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.checkoutSession = null;
        state.redirectUrl = null;
      })

      // Process Checkout Success
      .addCase(processCheckoutSuccess.pending, (state) => {
        state.isProcessing = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(processCheckoutSuccess.fulfilled, (state, action) => {
        state.isProcessing = false;
        state.currentOrder = {
          orderId: action.payload!.orderId,
          totalAmount: action.payload?.totalAmount || state.checkoutSession?.totalAmount || 0,
          status: "completed",
          createdAt: new Date().toISOString(),
        };
        state.successMessage =
          "Payment successful! Your order has been placed.";
        state.error = null;

        // Clear checkout session after successful payment
        state.checkoutSession = null;
        state.redirectUrl = null;
      })
      .addCase(processCheckoutSuccess.rejected, (state, action) => {
        state.isProcessing = false;
        state.error = action.payload as string;
        state.currentOrder = null;
        state.successMessage = null;
      });
  },
});

export const {
  clearPaymentsError,
  clearSuccessMessage,
  clearCheckoutSession,
  clearCurrentOrder,
  setRedirectUrl,
  resetPaymentState,
} = paymentsSlice.actions;

export default paymentsSlice.reducer;
