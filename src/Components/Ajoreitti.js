import React from 'react';

function Ajoreitti({ onRouteChange }) {

  const handleRouteChange = (route) => {
    onRouteChange(route);
  };

  return (
    <div className="div2">
        <input className="input4" type="text" onChange={handleRouteChange} placeholder="Ajoreitti" />
    </div>
  );
}

export default Ajoreitti;