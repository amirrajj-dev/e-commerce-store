import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../stores/hook";
import {
  createCheckoutSession,
  processCheckoutSuccess,
} from "../stores/reducers/payments/payments.thunks";
import {
  clearPaymentsError,
  clearSuccessMessage,
  clearCheckoutSession,
  clearCurrentOrder,
  setRedirectUrl,
  resetPaymentState,
} from "../stores/reducers/payments/payments.slice";
import type { CreateCheckoutSessionDto } from "../utils/dtos";

export const usePayments = () => {
  const dispatch = useAppDispatch();
  const payments = useAppSelector((state) => state.payments);

  const initiateCheckout = useCallback(
    async (checkoutData: CreateCheckoutSessionDto) => {
      const result = await dispatch(
        createCheckoutSession(checkoutData)
      ).unwrap();
      return result;
    },
    [dispatch]
  );

  const handleCheckoutSuccess = useCallback(
    async (sessionId: string) => {
      const result = await dispatch(
        processCheckoutSuccess({ sessionId })
      ).unwrap();
      return result;
    },
    [dispatch]
  );

  const clearError = useCallback(() => {
    dispatch(clearPaymentsError());
  }, [dispatch]);

  const clearMessage = useCallback(() => {
    dispatch(clearSuccessMessage());
  }, [dispatch]);

  const clearSession = useCallback(() => {
    dispatch(clearCheckoutSession());
  }, [dispatch]);

  const clearOrder = useCallback(() => {
    dispatch(clearCurrentOrder());
  }, [dispatch]);

  const reset = useCallback(() => {
    dispatch(resetPaymentState());
  }, [dispatch]);

  const redirectToCheckout = useCallback(
    (url: string) => {
      dispatch(setRedirectUrl(url));
    },
    [dispatch]
  );

  const getStripeCheckoutUrl = useCallback((sessionId: string) => {
    return `https://checkout.stripe.com/pay/${sessionId}`;
  }, []);

  return {
    ...payments,
    initiateCheckout,
    handleCheckoutSuccess,
    clearError,
    clearMessage,
    clearSession,
    clearOrder,
    reset,
    redirectToCheckout,
    getStripeCheckoutUrl,
    hasActiveSession: !!payments.checkoutSession,
    canProceedToPayment: !!payments.redirectUrl,
  };
};
