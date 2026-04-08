import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FaHeart, FaBookmark, FaCommentDots, FaHome } from 'react-icons/fa';
import './Home.css'

const Home = () => {
    const [foodItems, setFoodItems] = useState([]);
    const [playingVideoId, setPlayingVideoId] = useState(null);
    const videoRefs = React.useRef({});
    const navigate = useNavigate();

    // handle user interaction for like/save
    const handleLike = async (foodId, e) => {
        if (e) e.stopPropagation();
        try { 
            const res = await axios.post(
                'http://localhost:5000/api/food/like',
                { foodId },
                { withCredentials: true }
            );
            setFoodItems((prev) =>
                prev.map((item) => {
                    if (item._id === foodId) {
                        const newLiked = !item.isLiked;
                        const updatedCount =
                            res.data.likeCount !== undefined
                                ? res.data.likeCount
                                : item.likes + (newLiked ? 1 : -1);
                        return {
                            ...item,
                            isLiked: newLiked,
                            likes: updatedCount
                        };
                    }
                    return item;
                })
            );
        } catch (err) {
            console.error('like error', err);
        }
    };

    const handleSave = async (foodId, e) => {
        if (e) e.stopPropagation();
        try {
            const res = await axios.post(
                'http://localhost:5000/api/food/save',
                { foodId },
                { withCredentials: true }
            );
            setFoodItems((prev) =>
                prev.map((item) => {
                    if (item._id === foodId) {
                        return {
                            ...item,
                            isSaved: !item.isSaved
                        };
                    }
                    return item;
                })
            );
        } catch (err) {
            console.error('save error', err);
        }
    };

    useEffect(() => {
        const ensureAuthAndFetch = async () => {
            try {
                // check authentication
                await axios.get('http://localhost:5000/api/auth/user/me', {
                    withCredentials: true
                });
            } catch (err) {
                // not logged in → redirect to login
                navigate('/user/login');
                return;
            }

            // if authenticated, load feed
            try {
                const response = await axios.get('http://localhost:5000/api/food', {
                    withCredentials: true
                });
                if (response.data && response.data.foodItems) {
                    setFoodItems(response.data.foodItems);
                }
            } catch (error) {
                console.error("Error fetching food items:", error);
            }
        };

        ensureAuthAndFetch();
    }, []);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.6 // Video must be 60% visible to play
        };

        const handleIntersection = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const videoId = entry.target.getAttribute('data-id');
                    setPlayingVideoId(videoId);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, observerOptions);

        // Observe all video elements
        Object.values(videoRefs.current).forEach((video) => {
            if (video) observer.observe(video);
        });

        return () => {
            observer.disconnect();
        };
    }, [foodItems]);

    useEffect(() => {
        Object.keys(videoRefs.current).forEach((id) => {
            const video = videoRefs.current[id];
            if (video) {
                if (id === playingVideoId) {
                    video.play().catch(error => console.log("Autoplay prevented:", error));
                } else {
                    video.pause();
                    video.currentTime = 0; // Optional: Reset video when scrolled away
                }
            }
        });
    }, [playingVideoId]);

    const handleVisitStore = (item) => {
        navigate(`/food-partner/profile/${item.foodPartner}`);
    };

    return (
        <div className="home-container">
            {foodItems.map((item) => (
                <div key={item._id} className="video-section">
                    <video
                        ref={(el) => (videoRefs.current[item._id] = el)}
                        data-id={item._id}
                        src={item.video}
                        className="video-player"
                        loop
                        muted
                        playsInline
                        onClick={(e) => {
                            // Toggle play/pause on click
                            if (e.target.paused) {
                                e.target.play();
                                setPlayingVideoId(item._id);
                            } else {
                                e.target.pause();
                            }
                        }}
                    />

                    {/* Overlay Content */}
                    {(item.description || item.foodPartner) && (
                      <div className="overlay-content">
                          <p className="video-description">
                              {item.description}
                          </p>

                          <button
                              onClick={() => handleVisitStore(item)}
                              className="visit-store-btn"
                          >
                              Visit Store
                          </button>
                      </div>
                    )}

                    {/* Right‑side icon stack */}
                    <div className="overlay-icons">
                        <div
                            className="icon-group"
                            onClick={(e) => handleLike(item._id, e)}
                        >
                            <div
                                className={`icon-circle ${
                                    item.isLiked ? 'liked' : ''
                                }`}
                            >
                                <FaHeart />
                            </div>
                            <span>{item.likes || 0}</span>
                        </div>
                        <div
                            className="icon-group"
                            onClick={(e) => handleSave(item._id, e)}
                        >
                            <div
                                className={`icon-circle ${
                                    item.isSaved ? 'saved' : ''
                                }`}
                            >
                                <FaBookmark />
                            </div>
                            {/* save count intentionally omitted */}
                        </div>
                        <div className="icon-group">
                            <div className="icon-circle"><FaCommentDots /></div>
                            <span>{item.comments || 0}</span>
                        </div>
                    </div>

                    {/* Inline Bottom Navigation */}
                    <div className="inline-nav">
                        <a href="/" className="nav-item">
                            <FaHome />
                            <span>home</span>
                        </a>
                        <a href="/saved" className="nav-item">
                            <FaBookmark />
                            <span>saved</span>
                        </a>
                    </div>
                </div>
            ))}
            {foodItems.length === 0 && (
                <div className="loading-container">
                    Loading or no videos available...
                </div>
            )}
        </div>
    )
}

export default Home