import { createSlice } from "@reduxjs/toolkit";
import type { CartItemI } from "../../../types/interfaces/cart.interface";
import {
  getCartProducts,
  addProductToCart,
  removeProductFromCart,
  updateProductQuantity,
  clearCartItems,
} from "./cart.thunks";
import type { UserI } from "../../../types/interfaces/user.interface";

interface CartState {
  items: CartItemI[];
  isLoading: boolean;
  isAdding: boolean;
  isRemoving: boolean;
  isUpdating: boolean;
  error: string | null;
  totalItems: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  isLoading: false,
  isAdding: false,
  isRemoving: false,
  isUpdating: false,
  error: null,
  totalItems: 0,
  totalPrice: 0,
};

// Helper function to calculate cart totals
const calculateTotals = (items: CartItemI[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);
  return { totalItems, totalPrice };
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCartError: (state) => {
      state.error = null;
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      state.error = null;
    },
    addItemOptimistic: (
      state,
      action: { payload: { productId: string; product: any; user: UserI } }
    ) => {
      const { productId, product, user } = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === productId
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id: `temp-${productId}`, // Temporary ID
          productId,
          product,
          quantity: 1,
          userId: "",
          createdAt: new Date(),
          updatedAt: new Date(),
          user,
        });
      }
      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;
    },
    removeItemOptimistic: (state, action: { payload: string }) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;
    },
    updateQuantityOptimistic: (
      state,
      action: { payload: { productId: string; quantity: number } }
    ) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((item) => item.productId === productId);

      if (item) {
        item.quantity = quantity;
        const totals = calculateTotals(state.items);
        state.totalItems = totals.totalItems;
        state.totalPrice = totals.totalPrice;
      }
    },
    refreshCartOnFailure: (state, action) => {
      state.items = action.payload;
      const totals = calculateTotals(action.payload);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Cart Products
      .addCase(getCartProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCartProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload as CartItemI[];
        const totals = calculateTotals(action.payload as CartItemI[]);
        state.totalItems = totals.totalItems;
        state.totalPrice = totals.totalPrice;
        state.error = null;
      })
      .addCase(getCartProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Add Product to Cart
      .addCase(addProductToCart.pending, (state) => {
        state.isAdding = true;
        state.error = null;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.isAdding = false;
        // Replace temporary items with actual server data
        const tempProductId = action.meta.arg.productId;
        state.items = state.items.map((item) =>
          item.id === `temp-${tempProductId}`
            ? { ...item, id: action.payload }
            : item
        );
        state.error = null;
        state.isAdding = false;
      })
      .addCase(addProductToCart.rejected, (state, action) => {
        state.isAdding = false;
        state.error = action.payload as string;
        const productId = action.meta.arg.productId;
        state.items = state.items.filter(
          (item) => !item.id.startsWith("temp-") || item.productId !== productId
        );
        const totals = calculateTotals(state.items);
        state.totalItems = totals.totalItems;
        state.totalPrice = totals.totalPrice;
      })

      // Remove Product from Cart
      .addCase(removeProductFromCart.pending, (state) => {
        state.isRemoving = true;
        state.error = null;
      })
      .addCase(removeProductFromCart.fulfilled, (state) => {
        state.isRemoving = false;
        state.error = null;
      })
      .addCase(removeProductFromCart.rejected, (state, action) => {
        state.isRemoving = false;
        state.error = action.payload as string;
      })

      // Update Product Quantity
      .addCase(updateProductQuantity.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateProductQuantity.fulfilled, (state) => {
        state.isUpdating = false;
        // The optimistic update already handled the UI change
        state.error = null;
      })
      .addCase(updateProductQuantity.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload as string;
        // On failure, we'll let the useCart hook handle the refetch
      })
      .addCase(clearCartItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(clearCartItems.fulfilled, (state) => {
        state.isLoading = false;
        state.items = [];
        state.totalItems = 0;
        state.totalPrice = 0;
        state.error = null;
      })
      .addCase(clearCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearCartError,
  clearCart,
  addItemOptimistic,
  removeItemOptimistic,
  updateQuantityOptimistic,
  refreshCartOnFailure,
} = cartSlice.actions;

export default cartSlice.reducer;
