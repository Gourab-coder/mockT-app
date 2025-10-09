import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SuccessPopup.css';

export default function SuccessPopup({ show, link, onClose, title, message }) {
  const navigate = useNavigate();

  if (!show) {
    return null;
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(link).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  const handleExit = () => {
    onClose(); // Hide the popup
    navigate('/');
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="link-container">
          <input type="text" value={link} readOnly />
          <button type="button" onClick={handleCopyLink}>Copy</button>
        </div>
        <button className="exit-button" onClick={handleExit}>Exit</button>
      </div>
    </div>
  );
}