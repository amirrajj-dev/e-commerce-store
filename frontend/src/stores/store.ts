import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user/user.slice";
import analyticsReducer from "./reducers/analytics/analytics.slice";
import productsReducer from "./reducers/products/products.slice";
import cartReducer from "./reducers/cart/cart.slice";
import couponsReducer from "./reducers/coupons/coupons.slice";
import paymentsReducer from "./reducers/payments/payments.slice";
import ModalReducer from "./reducers/modal/modal.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    analytics: analyticsReducer,
    products: productsReducer,
    cart: cartReducer,
    coupons: couponsReducer,
    payments: paymentsReducer,
    modal: ModalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "modal/openModal" , "cart/addItemOptimistic"],
        ignoredPaths: ["modal.content" , "cart.items"], // for serialization error (jsx content)
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
