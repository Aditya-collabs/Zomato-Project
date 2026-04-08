import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './Profile.css'
import axios from 'axios';
import VideoCard from '../../components/VideoCard';

export const Profile = ({ foodPartnerId, onClose }) => {
  const { id } = useParams();
  const finalId = foodPartnerId || id;

  const [profileData, setProfileData] = useState(null);
  const [videos, setVideos] = useState([]); // Placeholder for videos

  useEffect(() => {
    if (!finalId) return;
    axios.get(`http://localhost:5000/api/food-partner/profile/${finalId}`, { withCredentials: true })
      .then(response => {
        setProfileData(response.data.foodPartner);
        setVideos(response.data.foodPartner.foodItems || []); //Assuming the API returns a 'videos' array
      })
      .catch(error => {
        console.error("Error fetching profile data:", error);
      });
  }, [finalId]);

  if (!profileData) {
    return (
      <div className="profile-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
        Loading profile...
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        {onClose && (
          <button className="close-profile-btn" onClick={onClose}>
            &times;
          </button>
        )}
        <div className="profile-info">
          {/* Avatar Circle */}
          <div className="profile-avatar">
            <img src="https://images.unsplash.com/photo-1771580425735-7d7ce2419745?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D" alt="Avatar" />
          </div>

          {/* Info Buttons */}
          <div className="profile-details-actions">
            <div className="profile-action-btn">
              {profileData.name}
            </div>
            <div className="profile-action-btn">
              {profileData.address}
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-label">total meals</span>
            <span className="stat-value">{profileData.totalMeals}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">customer serve</span>
            <span className="stat-value">{profileData.customerServe}</span>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="video-grid">
        {videos.map((item, index) => (
          <VideoCard key={item._id || index} item={item} />
        ))}
      </div>
    </div>
  )
}

export default Profile

