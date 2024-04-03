import React from 'react';
import './YesNoDialog.css';

const Dialog = ({ message, onYes, onNo }) => {
  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <p>{message}</p>
        <button onClick={onYes}>Yes</button>
        <button onClick={onNo}>No</button>
      </div>
    </div>
  );
};

export default Dialog;
