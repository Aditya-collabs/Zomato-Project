import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/common.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserRegister = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post("http://localhost:5000/api/auth/user/register", {
      fullName,
      email,
      password
    },{
      withCredentials: true
    })

    navigate('/'); // Redirect to home page after successful registration
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <span className="role-badge">User Portal</span>
          <h1 className="auth-title">Create an account</h1>
          <p className="auth-subtitle">Join us to order your favorite food</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="fullName"
              className="form-input"
              placeholder="John Doe"
              required
            />
          </div>

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
              placeholder="Create a strong password"
              required
            />
          </div>

          <button type="submit" className="auth-button">
            Create account
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?
          <Link to="/user/login" className="auth-link">Sign in</Link>
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

export default UserRegister
