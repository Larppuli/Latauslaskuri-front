import React from 'react';
import '../styles.css';

function Mittarilukema1( {lastMeterNum} ) {
  return (
    <div className="div2">
        <p>
            Mittarilukema ennen latausta
            <b> {lastMeterNum} kWh </b>
        </p>
    </div>
  );
}

export default Mittarilukema1;