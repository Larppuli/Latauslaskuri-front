import React from 'react';
import '../styles.css';

function Nappi({ onSave }) {
  const handleSaveClick = () => {
    onSave();
  };

  return (
    <div className="div4">
      <button className="button-74" onClick={handleSaveClick}>
        Tallenna
      </button>
    </div>
  );
}

export default Nappi;