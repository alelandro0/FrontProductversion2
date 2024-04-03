import React from 'react';
import './Loaders.css'; 

const Loaders = ({ show }) => {
  
  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="loader">
          <span className="loader-text">loading</span>
          <span className="load"></span>
        </div>
      </div>
    </div>
  );
};

export default Loaders;

