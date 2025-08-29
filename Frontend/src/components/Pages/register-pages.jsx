import { Link } from 'react-router';
import RegisterForm from '../forms/register-form';

import "./register-pages.css"

const RegisterPage = () => {
  return (
    <div className="register-page">
      <div className="container">
        <div className="auth-container">
          <h1>Create Your Account</h1>
          <p>Join us today! Fill in the details below to get started.</p>
          <RegisterForm />
          <div className="auth-links">
            <p>
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 