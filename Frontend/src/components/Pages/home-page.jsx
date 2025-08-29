import Hero from '../hero';
import "./home-page.css"

const HomePage = () => {
  return (
    <div className="home-page">
      <Hero />
      <section className="features-section">
        <div className="container">
          <h2>Welcome to Our Platform</h2>
          <p>This is a simple authentication system built with MERN stack.</p>
          
          <div className="features-grid">
            <div className="feature-card">
              <h3>User Registration</h3>
              <p>Create your account with email and password</p>
            </div>
            <div className="feature-card">
              <h3>Secure Login</h3>
              <p>Access your profile with JWT authentication</p>
            </div>
            <div className="feature-card">
              <h3>Profile Management</h3>
              <p>View and manage your user information</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 