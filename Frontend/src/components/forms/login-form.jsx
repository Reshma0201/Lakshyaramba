import { useState } from 'react';
import { useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';

import './login-form.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, error, clearError } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const errors = {};

    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required';
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Clear auth error when user starts typing
    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await login({
        email: formData.email.trim(),
        password: formData.password
      });

      if (result.success) {
        navigate('/profile');
      }
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={validationErrors.email ? 'error' : ''}
          placeholder="Enter your email address"
          disabled={isSubmitting}
        />
        {validationErrors.email && (
          <span className="error-message">{validationErrors.email}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className={validationErrors.password ? 'error' : ''}
          placeholder="Enter your password"
          disabled={isSubmitting}
        />
        {validationErrors.password && (
          <span className="error-message">{validationErrors.password}</span>
        )}
      </div>

      {error && (
        <div className="auth-error">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="btn btn-primary submit-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  );
};

export default LoginForm; 