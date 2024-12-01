import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const message = error.response?.data?.message || "An error occurred";
    toast.error(message);
    return Promise.reject(error);
  }
);

export const productApi = {
  getAll: () => api.get("/products").catch(() => ({ data: [] })),
  getById: (id: string) =>
    api.get(`/products/${id}`).catch(() => ({ data: null })),
  getFeatured: () => api.get("/products/featured").catch(() => ({ data: [] })),
  getRecommended: () =>
    api.get("/products/recommended").catch(() => ({ data: [] })),
  create: (data: any) => api.post("/products", data),
  update: (id: string, data: any) => api.patch(`/products/${id}`, data),
  delete: (id: string) => api.delete(`/products/${id}`),
};

export const cartApi = {
  get: () => api.get("/cart").catch(() => ({ data: { items: [], total: 0 } })),
  addItem: (productId: string, quantity: number) =>
    api.post("/cart/items", { productId, quantity }),
  updateItem: (productId: string, quantity: number) =>
    api.patch(`/cart/items/${productId}`, { quantity }),
  removeItem: (productId: string) => api.delete(`/cart/items/${productId}`),
  applyCoupon: (code: string) => api.post("/cart/coupon", { code }),
};

export const checkoutApi = {
  createPaymentIntent: () => api.post("/checkout/create-payment-intent"),
  completeCheckout: (data: { paymentIntentId: string; shippingAddress: any }) =>
    api.post("/checkout/complete", data),
};

export const orderApi = {
  getAll: () => api.get("/orders").catch(() => ({ data: [] })),
  getById: (id: string) =>
    api.get(`/orders/${id}`).catch(() => ({ data: null })),
  create: (data: any) => api.post("/orders", data),
  updateStatus: (id: string, status: string) =>
    api.patch(`/orders/${id}/status`, { status }),
};

export const userApi = {
  register: (data: any) => api.post("/users/register", data),
  login: (data: any) => api.post("/users/login", data),
  getProfile: () => api.get("/users/profile").catch(() => ({ data: null })),
  updateProfile: (data: any) => api.patch("/users/profile", data),
  addAddress: (data: any) => api.post("/users/addresses", data),
  deleteAddress: (addressId: string) =>
    api.delete(`/users/addresses/${addressId}`),
};

export const newsletterApi = {
  subscribe: (email: string) => api.post("/newsletter/subscribe", { email }),
  unsubscribe: (email: string) =>
    api.post("/newsletter/unsubscribe", { email }),
};

export default api;
