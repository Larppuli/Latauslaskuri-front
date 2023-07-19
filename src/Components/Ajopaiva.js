import React from 'react';

function Ajopaiva({ selectedStartingDate, onStartingDateChange }) {
  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    onStartingDateChange(selectedDate);
  };

  return (
    <form className="form1">
      <div className="div3">Ajopäivä</div>
      <div className="aika1">
        <input className="input1" type="date" value={selectedStartingDate || ''} onChange={handleDateChange} />
      </div>
    </form>
  );
}

export default Ajopaiva;