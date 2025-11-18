import { createAsyncThunk } from "@reduxjs/toolkit";
import { productApi } from "../../../utils/api";
import api from "../../../utils/axios";

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await productApi.getAllProducts(api);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

export const getFeaturedProducts = createAsyncThunk(
  "products/getFeaturedProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await productApi.getFeaturedProducts(api);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch featured products"
      );
    }
  }
);

export const getRecommendedProducts = createAsyncThunk(
  "products/getRecommendedProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await productApi.getRecommendedProducts(api);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch recommended products"
      );
    }
  }
);

export const getProductsByCategory = createAsyncThunk(
  "products/getProductsByCategory",
  async (category: string, { rejectWithValue }) => {
    try {
      const response = await productApi.getProductsByCategory(api, category);
      return { category, data: response.data };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products by category"
      );
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData: FormData, { rejectWithValue }) => {
    try {
      const response = await productApi.createProduct(api, productData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create product"
      );
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, data }: { id: string; data: FormData }, { rejectWithValue }) => {
    try {
      const response = await productApi.updateProduct(api, id, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update product"
      );
    }
  }
);

export const toggleFeaturedStatus = createAsyncThunk(
  "products/toggleFeaturedStatus",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await productApi.toggleFeaturedStatus(api, id);
      return { id, data: response.data };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to toggle featured status"
      );
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: string, { rejectWithValue }) => {
    try {
      await productApi.deleteProduct(api, id);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete product"
      );
    }
  }
);