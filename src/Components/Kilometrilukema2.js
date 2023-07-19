import React from 'react';

function Kilometrilukema2({ onKilometerChange }) {

  const handleKilometerChange = (event) => {
    const kilometer = parseInt(event.target.value);
    onKilometerChange(kilometer);
  };

  return (
    <div className="div2">
        <input className="input4" type="number" step="1" onChange={handleKilometerChange} placeholder="Kilometrilukema ajon jälkeen" />
    </div>
  );
}

export default Kilometrilukema2;