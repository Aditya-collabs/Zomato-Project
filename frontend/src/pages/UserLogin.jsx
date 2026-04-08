import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/common.css'
import { useNavigate } from 'react-router-dom'

const UserLogin = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post("http://localhost:5000/api/auth/user/login", {
        email,
        password
      }, {
        withCredentials: true
      });

      navigate('/'); // Redirect to home page after successful login
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <span className="role-badge">User Portal</span>
          <h1 className="auth-title">Welcome</h1>
          <p className="auth-subtitle">Enter your credentials to access your account</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email address</label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="name@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="auth-button">
            Sign in
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account?
          <Link to="/user/register" className="auth-link">Create account</Link>
        </div>

        <div className="auth-separator">
          <span>OR</span>
        </div>

        <Link to="/food-partner/register" className="auth-switch-link">
          Register as Food Partner
        </Link>
      </div>
    </div>
  )
}

export default UserLogin
