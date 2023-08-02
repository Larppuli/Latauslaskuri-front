import React from 'react';

function Paivavalitsin({ selectedStartingDate, onStartingDateChange, text, defaultValue }) {
  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    onStartingDateChange(selectedDate);
  };

  return (
    <form className="form1">
      <div className="div3">{text}</div>
      <div className="aika1">
        <input
          className="input1"
          type="date"
          value={selectedStartingDate !== undefined ? selectedStartingDate : defaultValue !== undefined ? defaultValue : ''}
          onChange={handleDateChange}
        />
      </div>
    </form>
  );
}

export default Paivavalitsin;