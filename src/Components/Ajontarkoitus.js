import React from 'react';

function Ajontarkoitus({ selectedReason, onReasonChange }) {
  const handleReasonChange = (event) => {
    const reason = event.target.value;
    onReasonChange(reason);
  };

  return (
    <div className="div2">
      <input className="input4" type="text" value={selectedReason || ''} onChange={handleReasonChange} placeholder="Ajon tarkoitus" />
    </div>
  );
}

export default Ajontarkoitus;