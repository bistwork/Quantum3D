import React from 'react';

const Popup = ({ isOpen, onClose,onSend,children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-title">
            <h2>Select Costumer</h2>
            <button className="close-button" onClick={onClose}><svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" className="css-d7bq5"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg></button>
        </div>
        {children}
        <div className="popup-end">
            <button className="overview-send-button" onClick={onSend}>SEND</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
