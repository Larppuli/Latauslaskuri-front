import React from 'react';

function Tekstiasetus({ onValueChange, selectedValue, name, defaultValue }) {
    const handleValueChange = (event) => {
        const selectedValue = event.target.value;
        onValueChange(selectedValue);
      };


      return (
        <div className='form1'>
          <div className='div3'>{name}</div>
          <input
            className="input1"
            type="text"
            value={selectedValue || defaultValue || ''}
            onChange={handleValueChange}
          />
        </div>
      );
    }

export default Tekstiasetus;