import { Link } from 'react-router';
import useAuth from '../hooks/useAuth';
import './hero.css';

const Hero = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Secure Authentication System
          </h1>
          <p className="hero-subtitle">
            A simple way to manage user authentication with MERN stack and JWT.
            Built for learning and understanding modern web development practices.
          </p>
          <div className="hero-actions">
            {isAuthenticated ? (
              <Link to="/profile" className="btn btn-primary btn-large">
                View Profile
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary btn-large">
                  Get Started
                </Link>
                <Link to="/login" className="btn btn-secondary btn-large">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;