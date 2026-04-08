import React from 'react';
import './VideoCard.css';

const VideoCard = ({ item }) => {
  return (
    <div className="grid-item">
      <video
        className="grid-video"
        src={item.video}
        muted
        loop
        onMouseEnter={(e) => e.target.play()}
        onMouseLeave={(e) => {
          e.target.pause();
          e.target.currentTime = 0;
        }}
      />
    </div>
  );
};

export default VideoCard;
