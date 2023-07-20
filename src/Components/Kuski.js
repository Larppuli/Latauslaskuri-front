import React from 'react';

const Kuski = ({ selectedDriver, onDriverChange }) => {
  const handleDriverChange = (event) => {
    onDriverChange(event.target.value);
  };

  return (
    <div className='div4'>
      <select className='input2' value={selectedDriver} onChange={handleDriverChange}>
        <option value="">Kuski</option>
        <option value="Terhi">Terhi</option>
        <option value="Timo">Timo</option>
      </select>
    </div>
  );
};

export default Kuski;