import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import axios from 'axios';
import { FaBookmark } from 'react-icons/fa';
import './Saved.css';

const Saved = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const ensureAuthAndFetch = async () => {
      try {
        await axios.get('http://localhost:5000/api/auth/user/me', { withCredentials: true });
      } catch (e) {
        navigate('/user/login');
        return;
      }
      axios
        .get('http://localhost:5000/api/user/saved-videos', { withCredentials: true })
        .then((res) => setVideos(res.data.saved || []))
        .catch((err) => console.error(err));
    };
    ensureAuthAndFetch();
  }, []);

  const handleUnsave = async (foodId) => {
    try {
      await axios.post(
        'http://localhost:5000/api/food/save',
        { foodId },
        { withCredentials: true }
      );
      // remove from list
      setVideos((prev) => prev.filter((v) => v._id !== foodId));
    } catch (err) {
      console.error('unsave error', err);
    }
  };

  return (
    <div className="saved-container">
      {/* heading removed as requested */}
      {videos.length === 0 ? (
        <p className="empty-msg">You haven't saved anything yet.</p>
      ) : (
        <div className="video-grid">
          {videos.map((item, idx) => (
            <div key={item._id || idx} className="grid-item-wrapper">
              <VideoCard item={item} />
              <div
                className="unsave-overlay"
                onClick={() => handleUnsave(item._id)}
              >
                <FaBookmark className="saved" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Saved;
