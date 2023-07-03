import React from 'react';

function Mittarilukema2({ onMeterNumChange }) {

  const handleMeterNumChange = (event) => {
    const meterNum = parseFloat(event.target.value, 10);
    onMeterNumChange(meterNum);
  };

  return (
    <div className="div2">
        <input className="input1" type="number" step="0.01" onChange={handleMeterNumChange} placeholder="Mittarilukema latauksen jälkeen" />
    </div>
  );
}

export default Mittarilukema2;