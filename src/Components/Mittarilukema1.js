import React from 'react';
import '../styles.css';

function Mittarilukema1( {lastMeterNum, onLastMeterNumChange} ) {

  const handleLastMeterNumChange = (event) => {
    const lastMeterNum = parseFloat(event.target.value, 10);
    onLastMeterNumChange(lastMeterNum);
  };

  return (
    <div className="div2">
        <p>
            Mittarilukema ennen latausta:
            <input className="input2" type="number" step="0.01" onChange={handleLastMeterNumChange} defaultValue={lastMeterNum} />
            kWh
        </p>
    </div>
  );
}

export default Mittarilukema1;