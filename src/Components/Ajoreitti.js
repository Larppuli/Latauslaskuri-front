import React from 'react';

function Ajoreitti({ selectedRoute, onRouteChange }) {
  const handleRouteChange = (event) => {
    const route = event.target.value;
    onRouteChange(route);
  };

  return (
    <div className="div2">
      <input className="input4" type="text" value={selectedRoute || ''} onChange={handleRouteChange} placeholder="Ajoreitti" />
    </div>
  );
}

export default Ajoreitti;