import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../config/axios.js';
import tokenUtils from '../utils/token-utils.js';

const useAuthStore = create(
  persist(
    (set) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
      setLoading: (loading) => set({ isLoading: loading }),

      // Login action
      login: async (credentials) => {
        try {
          set({ isLoading: true, error: null });

          const { data } = await api.post('/auth/login', credentials);
          const { token, user } = data.data;

          // Store token using token utilities
          tokenUtils.setToken(token);

          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          return { success: true };
        } catch (error) {
          set({
            isLoading: false,
            error: error.message || 'Login failed',
          });
          return { success: false, error: error.message };
        }
      },

      // Register action
      register: async (userData) => {
        try {
          set({ isLoading: true, error: null });

          const { data } = await api.post('/auth/register', userData);
          const { token, user } = data.data;

          // Store token using token utilities
          tokenUtils.setToken(token);

          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          return { success: true };
        } catch (error) {
          set({
            isLoading: false,
            error: error.message || 'Registration failed',
          });
          return { success: false, error: error.message };
        }
      },

      // Logout action
      logout: () => {
        // Clear token using token utilities
        tokenUtils.removeToken();

        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      },

      // Get current user profile
      getCurrentUser: async () => {
        try {
          set({ isLoading: true, error: null });

          const { data } = await api.get('/auth/me');
          const user = data.data;

          set({
            user,
            isLoading: false,
            error: null,
          });

          return { success: true, user };
        } catch (error) {
          set({
            isLoading: false,
            error: error.message || 'Failed to get user profile',
          });
          return { success: false, error: error.message };
        }
      },

      // Initialize auth state from localStorage
      initializeAuth: () => {
        const token = tokenUtils.getToken();
        if (token && !tokenUtils.isTokenExpired(token)) {
          set({
            token,
            isAuthenticated: true,
          });
          // Don't automatically fetch user data here to avoid infinite loops
          // User data will be fetched when needed (e.g., in ProfilePage)
        } else if (token && tokenUtils.isTokenExpired(token)) {
          tokenUtils.removeToken();
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });
        }
      },

      // Check if user is authenticated
      checkAuth: () => {
        const token = tokenUtils.getToken();
        const isAuthenticated = !!token && !tokenUtils.isTokenExpired(token);

        if (token && tokenUtils.isTokenExpired(token)) {
          // Token is expired, clear it
          tokenUtils.removeToken();
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });
          return false;
        }

        set({
          token,
          isAuthenticated,
        });

        return isAuthenticated;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;