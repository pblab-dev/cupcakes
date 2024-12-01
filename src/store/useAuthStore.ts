import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../services/api';

interface AuthState {
  token: string | null;
  user: any | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: any) => Promise<void>;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      login: async (email, password) => {
        const response = await api.post('/users/login', { email, password });
        const { token, user } = response.data;
        set({ token, user, isAuthenticated: true });
        localStorage.setItem('token', token);
      },

      register: async (name, email, password) => {
        const response = await api.post('/users/register', { name, email, password });
        const { token, user } = response.data;
        set({ token, user, isAuthenticated: true });
        localStorage.setItem('token', token);
      },

      logout: () => {
        localStorage.removeItem('token');
        set({ token: null, user: null, isAuthenticated: false });
      },

      updateProfile: async (data) => {
        const response = await api.patch('/users/profile', data);
        set({ user: response.data });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;