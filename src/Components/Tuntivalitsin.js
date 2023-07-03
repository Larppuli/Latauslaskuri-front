import React from 'react';

const Tuntivalitsin = ({ selectedHour, selectedMinute, onHourChange, onMinuteChange }) => {
  const handleHourChange = (event) => {
    const hour = parseInt(event.target.value, 10);
    onHourChange(hour);
  };

  const handleMinuteChange = (event) => {
    const minute = parseInt(event.target.value, 10);
    onMinuteChange(minute);
  };

  return (
    <div className="div3">
      <label htmlFor="hour">Tunnit:</label>
      <select className="aikavalitsin" id="hour" value={selectedHour} onChange={handleHourChange}>
        {Array.from({ length: 24 }, (_, index) => (
          <option key={index} value={index}>
            {index}
          </option>
        ))}
      </select>

      <label htmlFor="minute">Minuutit:</label>
      <select className="aikavalitsin" id="minute" value={selectedMinute} onChange={handleMinuteChange}>
        {Array.from({ length: 60 }, (_, index) => (
          <option key={index} value={index}>
            {index}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Tuntivalitsin;