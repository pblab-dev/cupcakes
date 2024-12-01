import { create } from "zustand";
import { CartItem } from "../types";
import { cartApi } from "../services/api";

interface CartStore {
  items: CartItem[];
  total: number;
  couponCode: string | null;
  isLoading: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
  addToCart: (cupcakeId: string, quantity: number) => Promise<void>;
  updateQuantity: (cupcakeId: string, quantity: number) => Promise<void>;
  removeItem: (cupcakeId: string) => Promise<void>;
  applyCoupon: (code: string) => Promise<void>;
  clearCart: () => void;
}

const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  total: 0,
  couponCode: null,
  isLoading: false,
  error: null,

  fetchCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await cartApi.get();
      set({
        items: data.items,
        total: data.total,
        couponCode: data.couponCode,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  addToCart: async (cupcakeId: string, quantity: number) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await cartApi.addItem(cupcakeId, quantity);
      set({ items: data.items, total: data.total });
    } finally {
      set({ isLoading: false });
    }
  },

  updateQuantity: async (cupcakeId: string, quantity: number) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await cartApi.updateItem(cupcakeId, quantity);
      set({ items: data.items, total: data.total });
    } finally {
      set({ isLoading: false });
    }
  },

  removeItem: async (cupcakeId: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await cartApi.removeItem(cupcakeId);
      set({ items: data.items, total: data.total });
    } finally {
      set({ isLoading: false });
    }
  },

  applyCoupon: async (code: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await cartApi.applyCoupon(code);
      set({ total: data.total, couponCode: data.couponCode });
    } finally {
      set({ isLoading: false });
    }
  },

  clearCart: () => {
    set({ items: [], total: 0, couponCode: null });
  },
}));

export default useCartStore;
