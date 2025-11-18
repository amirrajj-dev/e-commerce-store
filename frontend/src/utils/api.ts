import type { AxiosInstance } from "axios";
import type {
  SignUpDto,
  SignInDto,
  CreateCartDto,
  UpdateProductQuantityDto,
  DeleteCartDto,
  ValidateCouponDto,
  CreateCouponDto,
  CreateCheckoutSessionDto,
  CheckoutSuccess,
} from "./dtos";
import type { ApiResponse } from "../types/api/api.interface";
import type { ProductI } from "../types/interfaces/product.interface";
import type { UserI } from "../types/interfaces/user.interface";
import type { CartItemI } from "../types/interfaces/cart.interface";
import type { CouponI } from "../types/interfaces/coupon.interface";

// Auth API
const authApi = {
  signup: (api: AxiosInstance, user: SignUpDto) =>
    api.post<ApiResponse<UserI>>("/auth/signup", user).then((res) => res.data),
  signin: (api: AxiosInstance, user: SignInDto) =>
    api.post<ApiResponse<UserI>>("/auth/signin", user).then((res) => res.data),
  logout: (api: AxiosInstance) =>
    api.post<ApiResponse<void>>("/auth/logout").then((res) => res.data),
  refreshToken: (api: AxiosInstance) =>
    api.post<ApiResponse<void>>("/auth/refresh-token").then((res) => res.data),
  getProfile: (api: AxiosInstance) =>
    api.get<ApiResponse<UserI>>("/auth/profile").then((res) => res.data),
};

// Product API
const productApi = {
  getAllProducts: (api: AxiosInstance) =>
    api.get<ApiResponse<ProductI[]>>("/products").then((res) => res.data),
  getFeaturedProducts: (api: AxiosInstance) =>
    api
      .get<ApiResponse<ProductI[]>>("/products/featured")
      .then((res) => res.data),
  getRecommendedProducts: (api: AxiosInstance) =>
    api
      .get<ApiResponse<ProductI[]>>("/products/recommendations")
      .then((res) => res.data),
  getProductsByCategory: (api: AxiosInstance, category: string) =>
    api
      .get<ApiResponse<ProductI[]>>(`/products/category/${category}`)
      .then((res) => res.data),
  createProduct: (api: AxiosInstance, product: FormData) =>
    api
      .post<ApiResponse<ProductI>>("/products", product, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data),
  updateProduct: (api: AxiosInstance, id: string, product: FormData) =>
    api
      .put<ApiResponse<ProductI>>(`/products/${id}`, product, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data),
  toggleFeaturedStatus: (api: AxiosInstance, id: string) =>
    api.patch<ApiResponse<void>>(`/products/${id}`).then((res) => res.data),
  deleteProduct: (api: AxiosInstance, id: string) =>
    api.delete<ApiResponse<void>>(`/products/${id}`).then((res) => res.data),
};

// Cart API
const cartApi = {
  getCartProducts: (api: AxiosInstance) =>
    api.get<ApiResponse<CartItemI[]>>("/cart").then((res) => res.data),
  addProductToCart: (api: AxiosInstance, cartItem: CreateCartDto) =>
    api.post<ApiResponse<void>>("/cart", cartItem).then((res) => res.data),
  removeProductFromCart: (api: AxiosInstance, cartItem: DeleteCartDto) =>
    api
      .delete<ApiResponse<void>>("/cart", { data: cartItem })
      .then((res) => res.data),
  updateProductQuantity: (
    api: AxiosInstance,
    id: string,
    quantity: UpdateProductQuantityDto
  ) =>
    api.put<ApiResponse<void>>(`/cart/${id}`, quantity).then((res) => res.data),
  clearCart: (api: AxiosInstance) =>
    api.delete<ApiResponse<void>>("/cart/clear").then((res) => res.data),
};

// Coupon API
const couponApi = {
  getCoupon: (api: AxiosInstance) =>
    api.get<ApiResponse<CouponI | null>>("/coupons").then((res) => res.data),
  validateCoupon: (api: AxiosInstance, coupon: ValidateCouponDto) =>
    api
      .post<ApiResponse<{ code: string; isValid: boolean; percent: number }>>(
        "/coupons/validate",
        coupon
      )
      .then((res) => res.data),
  createCoupon: (api: AxiosInstance, coupon: CreateCouponDto) =>
    api.post<ApiResponse<CouponI>>("/coupons", coupon).then((res) => res.data),
};

// Payment API
const paymentApi = {
  createCheckoutSession: (
    api: AxiosInstance,
    checkoutData: CreateCheckoutSessionDto
  ) =>
    api
      .post<
        ApiResponse<{
          id: string;
          totalAmount: number;
          url: string;
        }>
      >("/payments/create-checkout-session", checkoutData)
      .then((res) => res.data),
  checkoutSuccess: (api: AxiosInstance, successData: CheckoutSuccess) =>
    api
      .post<
        ApiResponse<{
          orderId: string;
          totalAmount: number;
        }>
      >("/payments/checkout-success", successData)
      .then((res) => res.data),
};

// Analytics API
const analyticsApi = {
  getAnalytics: (api: AxiosInstance) =>
    api
      .get<
        ApiResponse<{
          analyticsData: {
            totalUsers: number;
            totalProducts: number;
            totalSales: number;
            totalRevenue: number;
            dailySales: Array<{
              date: string;
              sales: number;
              revenue: number;
            }>;
          };
        }>
      >("/analytics")
      .then((res) => res.data),
};

export { authApi, productApi, cartApi, couponApi, paymentApi, analyticsApi };
