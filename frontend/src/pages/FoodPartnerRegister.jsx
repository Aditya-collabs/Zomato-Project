import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/common.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FoodPartnerRegister = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      contactName: e.target.contactName.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
      password: e.target.password.value,
      address: e.target.address.value,
      name: e.target.contactName.value // Using contactName as name for now based on form fields available
    };

    try {
      const response = await axios.post("http://localhost:5000/api/auth/food-partner/register", formData, {
        withCredentials: true
      });
      navigate("/create-food"); // Redirect to create food page after successful registration
    } catch (error) {
      console.error("Registration failed:", error);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <span className="role-badge">Partner Portal</span>
          <h1 className="auth-title">Become a Partner</h1>
          <p className="auth-subtitle">Grow your business with us</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Contact Name</label>
            <input
              type="text"
              name="contactName"
              className="form-input"
              placeholder="John Doe"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone</label>
            <input
              type="tel"
              name="phone"
              className="form-input"
              placeholder="+1 234 567 890"
              required
            />
          </div>



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
              placeholder="Create a strong password"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Address</label>
            <input
              type="text"
              name="address"
              className="form-input"
              placeholder="123 Food Street, City"
              required
            />
          </div>

          <button type="submit" className="auth-button">
            Register Restaurant
          </button>
        </form>

        <div className="auth-footer">
          Already a partner?
          <Link to="/food-partner/login" className="auth-link">Login here</Link>
        </div>

        <div className="auth-separator">
          <span>OR</span>
        </div>

        <Link to="/user/register" className="auth-switch-link">
          Register as User
        </Link>
      </div>
    </div>
  )
}

export default FoodPartnerRegister
