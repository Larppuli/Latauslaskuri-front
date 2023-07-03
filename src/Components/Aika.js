import React from 'react';

function Aika({ selectedStartingTime, selectedStartingDate, onStartingDateChange, onStartingTimeChange }) {
  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    onStartingDateChange(selectedDate);
  };

  const handleTimeChange = (event) => {
    const selectedTime = event.target.value;
    onStartingTimeChange(selectedTime);
  };

  return (
    <form className="form1">
      <div className="div3">Aloitusaika</div>
      <div className="aika1">
        <input className="input1" type="date" value={selectedStartingDate || ''} onChange={handleDateChange} />
        <input className="input1" type="time" value={selectedStartingTime || ''} onChange={handleTimeChange} />
      </div>
    </form>
  );
}

export default Aika;