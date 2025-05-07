import React, { useEffect } from 'react';
import '../Fabrication.css'

interface NotificationPopupProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
  duration?: number;
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({ 
  message, 
  type, 
  onClose,
  duration = 5000 
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`notification-popup ${type}`}>
      <div className="notification-content">
        <span className="notification-icon">
          {type === 'success' ? '✓' : '✗'}
        </span>
        <span className="notification-message">{message}</span>
      </div>
      <button className="notification-close" onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

export default NotificationPopup;