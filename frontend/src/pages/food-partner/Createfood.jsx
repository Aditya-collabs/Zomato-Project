import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateFood.css';

export default function CreateFood() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [video, setVideo] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    // Cleanup preview URL to prevent memory leaks
    React.useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideo(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleRemoveVideo = (e) => {
        e.stopPropagation();
        setVideo(null);
        setPreviewUrl('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!video || !name || !description) {
            alert("Please fill all fields and select a video.");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('video', video);
        formData.append('name', name);
        formData.append('description', description);

        try {
            await axios.post('http://localhost:5000/api/food/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            alert("Food item created successfully!");
            navigate('/'); // Or to the partner profile
        } catch (error) {
            console.error("Error creating food:", error);
            alert(error.response?.data?.message || "Failed to create food item.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-food-container">
            <div className="create-food-card">
                <h1 className="create-food-title">Create New Food</h1>
                <p className="create-food-subtitle">Upload a video and tell us about your dish</p>

                <form className="create-food-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Food Video</label>
                        <div
                            className="video-upload-area"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleVideoChange}
                                accept="video/*"
                                style={{ display: 'none' }}
                            />

                            {previewUrl ? (
                                <div className="video-preview-container">
                                    <video className="video-preview" src={previewUrl} controls={false} autoPlay muted loop />
                                    <button type="button" className="remove-video-btn" onClick={handleRemoveVideo}>&times;</button>
                                </div>
                            ) : (
                                <>
                                    <div className="upload-icon">🎬</div>
                                    <p className="upload-text">Click to upload video</p>
                                    <p className="upload-text" style={{ fontSize: '12px', marginTop: '4px' }}>MP4, WebM preferred</p>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="food-name">Dish Name</label>
                        <input
                            id="food-name"
                            className="form-input"
                            type="text"
                            placeholder="e.g. Spicy Grilled Chicken"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="food-desc">Description</label>
                        <textarea
                            id="food-desc"
                            className="form-textarea"
                            placeholder="Describe your delicious dish..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Create Food Item'}
                    </button>
                </form>
            </div>
        </div>
    );
}
