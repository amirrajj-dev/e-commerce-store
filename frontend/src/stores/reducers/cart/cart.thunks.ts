import { createAsyncThunk } from "@reduxjs/toolkit";
import { cartApi } from "../../../utils/api";
import api from "../../../utils/axios";
import type { 
  CreateCartDto, 
  DeleteCartDto, 
  UpdateProductQuantityDto 
} from "../../../utils/dtos";

export const getCartProducts = createAsyncThunk(
  "cart/getCartProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartApi.getCartProducts(api);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart items"
      );
    }
  }
);

export const addProductToCart = createAsyncThunk(
  "cart/addProductToCart",
  async (cartItem: CreateCartDto, { rejectWithValue }) => {
    try {
      await cartApi.addProductToCart(api, cartItem);
      return cartItem.productId; // Return productId for optimistic update
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add product to cart"
      );
    }
  }
);

export const removeProductFromCart = createAsyncThunk(
  "cart/removeProductFromCart",
  async (cartItem: DeleteCartDto, { rejectWithValue }) => {
    try {
      await cartApi.removeProductFromCart(api, cartItem);
      return cartItem.productId; // Return productId for optimistic update
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove product from cart"
      );
    }
  }
);

export const updateProductQuantity = createAsyncThunk(
  "cart/updateProductQuantity",
  async ({ id, quantity }: { id: string; quantity: UpdateProductQuantityDto }, { rejectWithValue }) => {
    try {
      await cartApi.updateProductQuantity(api, id, quantity);
      return { productId: id, quantity: quantity.quantity };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update product quantity"
      );
    }
  }
);

export const clearCartItems = createAsyncThunk(
  "cart/clearCartItems",
  async (_, { rejectWithValue }) => {
    try {
      await cartApi.clearCart(api);
      return;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to clear cart"
      );
    }
  }
);