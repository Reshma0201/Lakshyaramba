import { Link } from 'react-router';
import useAuth from '../hooks/useAuth';
import './header.css';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/">
              <h1>MERN Auth</h1>
            </Link>
          </div>
          
          <nav className="nav">
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              
              {isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <Link to="/profile" className="nav-link">Profile</Link>
                  </li>
                  <li className="nav-item">
                    <button onClick={logout} className="nav-link logout-btn">
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
          
          {isAuthenticated && (
            <div className="user-info">
              <span className="user-name">Hi, {user?.name || 'User'}!</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;