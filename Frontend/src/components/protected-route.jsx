import { Navigate } from 'react-router';
import useAuthStore from '../stores/authStore';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthStore();

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading cha hai...</div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render children if authenticated
  return children;
};

export default ProtectedRoute; 