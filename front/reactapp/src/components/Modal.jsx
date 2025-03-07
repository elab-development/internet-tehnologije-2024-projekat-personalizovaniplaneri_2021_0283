import React from "react";

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>{title}</h4>
        <div className="modal-body">{children}</div>
        <button className="btn btn-secondary mt-3" onClick={onClose}>Zatvori</button>
      </div>
    </div>
  );
}

export default Modal;
