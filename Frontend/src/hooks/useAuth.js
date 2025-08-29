import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/authStore.jsx";

const useAuth = () => {
  const {
    // State
    user,
    token,
    isAuthenticated,
    isLoading,
    error,

    // Actions
    login,
    register,
    logout,
    getCurrentUser,
    initializeAuth,
    checkAuth,
    setLoading,
    setError,
    clearError,
  } = useAuthStore();

  const navigate = useNavigate();
  
  // Helper methods
  const isLoggedIn = useCallback(() => isAuthenticated && !!token, [isAuthenticated, token]);

  const getUserInfo = useCallback(() => user, [user]);

  // Enhanced login with navigation
  const handleLogin = useCallback(async (credentials) => {
    clearError();
    const result = await login(credentials);

    if (result.success) {
      navigate("/profile");
    }

    return result;
  }, [login, clearError, navigate]);

  // Enhanced register with navigation
  const handleRegister = useCallback(async (userData) => {
    clearError();
    const result = await register(userData);

    if (result.success) {
      navigate("/profile");
    }

    return result;
  }, [register, clearError, navigate]);

  // Enhanced logout with cleanup + redirect
  const handleLogout = useCallback(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  const refreshUser = useCallback(async () => {
    if (isAuthenticated) {
      return await getCurrentUser();
    }
    return { success: false, error: "Not authenticated" };
  }, [isAuthenticated, getCurrentUser]);

  return {
    // State
    user,
    token,
    isAuthenticated,
    isLoading,
    error,

    // Enhanced methods
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    refreshUser,

    // Helper methods
    isLoggedIn,
    getUserInfo,
    checkAuth,
    clearError,

    // Utility methods
    setLoading,
    setError,

    // Store methods
    initializeAuth,
    getCurrentUser,
  };
};

export default useAuth;