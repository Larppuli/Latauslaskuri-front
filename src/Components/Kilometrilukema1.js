import React from 'react';
import '../styles.css';

function Kilometrilukema1( {lastKilometer, onLastKilometerChange} ) {

  const handleLastKilometerChange = (event) => {
    const lastKilometer = parseInt(event.target.value);
    onLastKilometerChange(lastKilometer);
  };

  return (
    <div className="div2">
        <p>
            Mittarilukema ennen ajoa:
            <input className="input2" type="number" step="1" onChange={handleLastKilometerChange} defaultValue={lastKilometer} />
            km
        </p>
    </div>
  );
}

export default Kilometrilukema1;