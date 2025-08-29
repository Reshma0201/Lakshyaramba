import { Link } from 'react-router';
import "./not-found-page.css"

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-container">
          <div className="error-code">404</div>
          <h1>Page Not Found</h1>
          <p>The page you're looking for doesn't exist or has been moved.</p>
          <div className="not-found-actions">
            <Link to="/" className="btn btn-primary">
              Go Home
            </Link>
            <Link to="/login" className="btn btn-secondary">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage; 