import React from 'react';
import PropTypes from 'prop-types';
import './ImageModal.css';

const ImageModal = ({ src, alt, onClose }) => {
  if (!src) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="modal-close" onClick={onClose}>&times;</span>
        <img src={src} alt={alt} className="modal-image" />
      </div>
    </div>
  );
};

ImageModal.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default ImageModal;
