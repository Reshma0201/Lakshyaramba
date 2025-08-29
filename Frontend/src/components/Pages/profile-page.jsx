import useAuth from '../../hooks/useAuth';

import "./profile-page.css"

const ProfilePage = () => {
  const { user, isLoading, error, refreshUser, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="profile-page">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner">Loading profile...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-page">
        <div className="container">
          <div className="error-container">
            <h2>Error Loading Profile</h2>
            <p>{error}</p>
            <button onClick={refreshUser} className="btn btn-primary">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-container">
          <h1>Your Profile</h1>
          <div className="profile-card">
            <div className="profile-header">
              <h2>Welcome, {user?.name || 'User'}!</h2>
            </div>
            <div className="profile-info">
              <div className="info-item">
                <label>Name:</label>
                <span>{user?.name || 'N/A'}</span>
              </div>
              <div className="info-item">
                <label>Email:</label>
                <span>{user?.email || 'N/A'}</span>
              </div>
              <div className="info-item">
                <label>Member Since:</label>
                <span>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</span>
              </div>
            </div>
            <div className="profile-actions">
              <button onClick={logout} className="btn btn-danger">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 