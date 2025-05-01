import React from 'react';
import './SuccessPopup.css';

interface SuccessPopupProps {
  role: string;
  onClose: () => void;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({ role, onClose }) => {
  return (
    <div className="success-overlay">
      <div className="success-popup">
        <p>
          Sucessfully Updated Responsibilities<br />
          for : <span className="role-name">{role}</span>
        </p>
        <button className="ok-button" onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default SuccessPopup;