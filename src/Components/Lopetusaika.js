import React from 'react';

function Lopetusaika({ selectedStartingTime, selectedEndingTime, selectedStartingDate, onStartingDateChange, onStartingTimeChange, onEndingTimeChange }) {
  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    onStartingDateChange(selectedDate);
  };

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
        <input className="input1" type="date" value={selectedStartingDate || ''} onChange={handleDateChange} />
        <input className="input3" type="time" value={selectedStartingTime || ''} onChange={handleStartingTimeChange} />
        <input className="input3" type="time" value={selectedEndingTime || ''} onChange={handleEndingTimeChange} />
      </div>
    </form>
  );
}

export default Lopetusaika;