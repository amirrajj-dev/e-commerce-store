import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../stores/hook';
import {
  getAllProducts,
  getFeaturedProducts,
  getRecommendedProducts,
  getProductsByCategory,
  createProduct,
  updateProduct,
  toggleFeaturedStatus,
  deleteProduct,
} from '../stores/reducers/products/products.thunks';
import { clearProductsError, setCurrentCategory } from '../stores/reducers/products/products.slice';

export const useProducts = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products);

  const fetchAllProducts = useCallback(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const fetchFeaturedProducts = useCallback(() => {
    dispatch(getFeaturedProducts());
  }, [dispatch]);

  const fetchRecommendedProducts = useCallback(() => {
    dispatch(getRecommendedProducts());
  }, [dispatch]);

  const fetchProductsByCategory = useCallback((category: string) => {
    dispatch(getProductsByCategory(category));
  }, [dispatch]);

  const addProduct = useCallback((productData: FormData) => {
    return dispatch(createProduct(productData)).unwrap();
  }, [dispatch]);

  const editProduct = useCallback((id: string, productData: FormData) => {
    return dispatch(updateProduct({ id, data: productData })).unwrap();
  }, [dispatch]);

  const toggleFeatured = useCallback((id: string) => {
    return dispatch(toggleFeaturedStatus(id)).unwrap();
  }, [dispatch]);

  const removeProduct = useCallback((id: string) => {
    return dispatch(deleteProduct(id)).unwrap();
  }, [dispatch]);

  const clearError = useCallback(() => {
    dispatch(clearProductsError());
  }, [dispatch]);

  const selectCategory = useCallback((category: string | null) => {
    dispatch(setCurrentCategory(category));
  }, [dispatch]);

  return {
    ...products,
    fetchAllProducts,
    fetchFeaturedProducts,
    fetchRecommendedProducts,
    fetchProductsByCategory,
    addProduct,
    editProduct,
    toggleFeatured,
    removeProduct,
    clearError,
    selectCategory,
  };
};