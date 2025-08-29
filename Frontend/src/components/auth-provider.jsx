import { useEffect } from 'react';
import useAuthStore from '../stores/authStore';

export const AuthProvider = ({ children }) => {
  const initializeAuth = useAuthStore(state => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return children;
};