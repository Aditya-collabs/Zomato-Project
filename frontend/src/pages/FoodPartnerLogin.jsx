import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/common.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FoodPartnerLogin = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post("http://localhost:5000/api/auth/food-partner/login", {
      email,
      password
    }, { withCredentials: true });


    navigate("/create-food"); // Redirect to create food page after login

  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <span className="role-badge">Partner Portal</span>
          <h1 className="auth-title">Partner Login</h1>
          <p className="auth-subtitle">Manage your restaurant and orders</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Business Email</label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="partner@restaurant.com"
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
            Login to Dashboard
          </button>
        </form>

        <div className="auth-footer">
          New to our platform?
          <Link to="/food-partner/register" className="auth-link">Register your restaurant</Link>
        </div>
      </div>
    </div>
  )
}

export default FoodPartnerLogin
