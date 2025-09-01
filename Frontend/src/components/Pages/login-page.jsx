import { Link } from 'react-router';
import LoginForm from '../forms/login-form';
import "./login-page.css"
import Header from '../Header';

const LoginPage = () => {
  return (
    
    <div className="login-page">
      <div className="container">
        <div className="auth-container">
          <h1>Login to Your Account</h1>
          <p>Welcome back! Please enter your credentials to continue.</p>
          <LoginForm />
          <div className="auth-links">
            <p>
              Don't have an account? <Link to="/register">Sign up here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 