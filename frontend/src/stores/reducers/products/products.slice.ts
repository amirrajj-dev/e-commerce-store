import { createSlice } from "@reduxjs/toolkit";
import type { ProductI } from "../../../types/interfaces/product.interface";
import {
  getAllProducts,
  getFeaturedProducts,
  getRecommendedProducts,
  getProductsByCategory,
  createProduct,
  updateProduct,
  toggleFeaturedStatus,
  deleteProduct,
} from "./products.thunks";

interface ProductsState {
  allProducts: ProductI[];
  featuredProducts: ProductI[];
  recommendedProducts: ProductI[];
  productsByCategory: Record<string, ProductI[]>;
  isLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  error: string | null;
  currentCategory: string | null;
}

const initialState: ProductsState = {
  allProducts: [],
  featuredProducts: [],
  recommendedProducts: [],
  productsByCategory: {},
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  error: null,
  currentCategory: null,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProductsError: (state) => {
      state.error = null;
    },
    clearProductsByCategory: (state, action: { payload: string }) => {
      delete state.productsByCategory[action.payload];
    },
    clearAllProductsData: (state) => {
      state.allProducts = [];
      state.featuredProducts = [];
      state.recommendedProducts = [];
      state.productsByCategory = {};
    },
    setCurrentCategory: (state, action: { payload: string | null }) => {
      state.currentCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Products
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allProducts = action.payload as ProductI[];
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Get Featured Products
      .addCase(getFeaturedProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeaturedProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featuredProducts = action.payload as ProductI[];
      })
      .addCase(getFeaturedProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Get Recommended Products
      .addCase(getRecommendedProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getRecommendedProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recommendedProducts = action.payload as ProductI[];
      })
      .addCase(getRecommendedProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Get Products By Category
      .addCase(getProductsByCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productsByCategory[action.payload.category] = action.payload.data as ProductI[];
        state.currentCategory = action.payload.category;
      })
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isCreating = false;
        state.allProducts.unshift(action.payload as ProductI);
        state.error = null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.payload as string;
      })

      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isUpdating = false;
        const index = state.allProducts.findIndex(product => product.id === action.payload!.id);
        if (index !== -1) {
          state.allProducts[index] = action.payload as ProductI;
        }
        
        // Update in featured products if exists
        const featuredIndex = state.featuredProducts.findIndex(product => product.id === action.payload!.id);
        if (featuredIndex !== -1) {
          state.featuredProducts[featuredIndex] = action.payload as ProductI;
        }
        
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload as string;
      })

      // Toggle Featured Status
      .addCase(toggleFeaturedStatus.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(toggleFeaturedStatus.fulfilled, (state, action) => {
        state.isUpdating = false;
        const { id } = action.payload;
        
        // Update in all products
        const allProductsIndex = state.allProducts.findIndex(product => product.id === id);
        if (allProductsIndex !== -1) {
          state.allProducts[allProductsIndex].isFeatured = !state.allProducts[allProductsIndex].isFeatured;
        }
        
        // Add/remove from featured products
        const featuredIndex = state.featuredProducts.findIndex(product => product.id === id);
        if (featuredIndex !== -1) {
          // Remove from featured
          state.featuredProducts.splice(featuredIndex, 1);
        } else if (allProductsIndex !== -1) {
          // Add to featured
          state.featuredProducts.unshift(state.allProducts[allProductsIndex]);
        }
        
        state.error = null;
      })
      .addCase(toggleFeaturedStatus.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload as string;
      })

      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.isDeleting = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isDeleting = false;
        const productId = action.payload;
        
        // Remove from all products
        state.allProducts = state.allProducts.filter(product => product.id !== productId);
        
        // Remove from featured products
        state.featuredProducts = state.featuredProducts.filter(product => product.id !== productId);
        
        // Remove from recommended products
        state.recommendedProducts = state.recommendedProducts.filter(product => product.id !== productId);
        
        // Remove from all categories
        Object.keys(state.productsByCategory).forEach(category => {
          state.productsByCategory[category] = state.productsByCategory[category].filter(
            product => product.id !== productId
          );
        });
        
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearProductsError,
  clearProductsByCategory,
  clearAllProductsData,
  setCurrentCategory,
} = productsSlice.actions;

export default productsSlice.reducer;