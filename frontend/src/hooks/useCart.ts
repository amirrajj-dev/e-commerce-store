import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../stores/hook";
import {
  getCartProducts,
  addProductToCart,
  removeProductFromCart,
  updateProductQuantity,
  clearCartItems,
} from "../stores/reducers/cart/cart.thunks";
import {
  clearCartError,
  clearCart,
  addItemOptimistic,
  removeItemOptimistic,
  updateQuantityOptimistic,
} from "../stores/reducers/cart/cart.slice";
import type { UserI } from "../types/interfaces/user.interface";

export const useCart = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const { user, isAuthenticated } = useAppSelector((state) => state.user);

  const fetchCart = useCallback(() => {
    if (isAuthenticated) {
      dispatch(getCartProducts());
    }
  }, [dispatch, isAuthenticated]);

  const addToCart = useCallback(
    async (productId: string, product?: any) => {
      if (product) {
        dispatch(
          addItemOptimistic({ productId, product, user: user as UserI })
        );
      }

      try {
        await dispatch(addProductToCart({ productId })).unwrap();
      } catch (error) {
        dispatch(getCartProducts());
        throw error;
      }
    },
    [dispatch, user]
  );

  const removeFromCart = useCallback(
    async (productId: string) => {
      dispatch(removeItemOptimistic(productId));

      try {
        await dispatch(removeProductFromCart({ productId })).unwrap();
      } catch (error) {
        dispatch(getCartProducts());
        throw error;
      }
    },
    [dispatch]
  );

  const updateQuantity = useCallback(
    async (productId: string, quantity: number) => {
      dispatch(updateQuantityOptimistic({ productId, quantity }));

      try {
        await dispatch(
          updateProductQuantity({
            id: productId,
            quantity: { quantity },
          })
        ).unwrap();
      } catch (error) {
        dispatch(getCartProducts());
        throw error;
      }
    },
    [dispatch]
  );

  const clearError = useCallback(() => {
    dispatch(clearCartError());
  }, [dispatch]);

  const emptyCart = useCallback(async () => {
    try {
      await dispatch(clearCartItems()).unwrap();
      dispatch(clearCart());
    } catch (error) {
      console.error("Failed to clear cart:", error);
      dispatch(clearCart());
      throw error;
    }
  }, [dispatch]);

  const getItemQuantity = useCallback(
    (productId: string) => {
      const item = cart.items.find((item) => item.productId === productId);
      return item ? item.quantity : 0;
    },
    [cart.items]
  );

  const isInCart = useCallback(
    (productId: string) => {
      return cart.items.some((item) => item.productId === productId);
    },
    [cart.items]
  );

  return {
    ...cart,
    fetchCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearError,
    emptyCart,
    getItemQuantity,
    isInCart,
  };
};
