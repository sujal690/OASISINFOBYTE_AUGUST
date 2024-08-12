import React from 'react';
import './BackgroundVideo.css'; // Import CSS for styling
import Backgroundvid from '../assets/background.mp4';

const BackgroundVideo = () => {
  return (
    <div className="background-video-container">
      <video autoPlay muted loop className="background-video">
        <source src={Backgroundvid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default BackgroundVideo;
