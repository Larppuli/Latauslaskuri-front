import React from 'react';

const Ajovali = ({ selectedStartingPlace, selectedEndingPlace, onStartingPlaceChange, onEndingPlaceChange }) => {

  const handleStartingPlaceChange = (event) => {
    const place = event.target.value;
    onStartingPlaceChange(place);
  };

  const handleEndingPlaceChange = (event) => {
    const place = event.target.value;
    onEndingPlaceChange(place);
  };

  return (
    <div className="div3">
        <input className="input5" type="text" value={selectedStartingPlace || ''} onChange={handleStartingPlaceChange} placeholder="Alkupiste" />
        <input className="input5" type="text" value={selectedEndingPlace || ''} onChange={handleEndingPlaceChange} placeholder="Päätepiste" />
    </div>
  );
};

export default Ajovali;