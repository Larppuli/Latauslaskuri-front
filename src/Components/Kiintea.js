import React from 'react';

function Kiintea({ onFixedPriceChange, lastFixedPrice }) {

  const handleFixedPriceChange = (event) => {
    const fixedPrice = parseFloat(event.target.value, 10);
    onFixedPriceChange(fixedPrice);
  };

  return (
    <div className='div3'>
        <div>
            <div className='div3' >Marginaali snt/kWh</div>
            <input className="input1" step="0.001" type="number" onChange={handleFixedPriceChange} defaultValue={lastFixedPrice} />
        </div>
    </div>
  );
}

export default Kiintea;