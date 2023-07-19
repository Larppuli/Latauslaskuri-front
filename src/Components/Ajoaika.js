import React from 'react';

function Ajoaika({ selectedStartingTime, selectedEndingTime, onStartingTimeChange, onEndingTimeChange }) {

  const handleStartingTimeChange = (event) => {
    const selectedTime = event.target.value;
    onStartingTimeChange(selectedTime);
  };

  const handleEndingTimeChange = (event) => {
    const selectedTime = event.target.value;
    onEndingTimeChange(selectedTime);
  };

  return (
    <form className="form1">
      <div className="div3">Ajoaika</div>
      <div className="aika1">
        <input className="input3" type="time" value={selectedStartingTime || ''} onChange={handleStartingTimeChange} />
        <input className="input3" type="time" value={selectedEndingTime || ''} onChange={handleEndingTimeChange} />
      </div>
    </form>
  );
}

export default Ajoaika;