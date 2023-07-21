import React, { useEffect, useState } from 'react';
import Ajokerta from './Ajokerta';

function Ajokerrat() {
  const [drivings, setDrivings] = useState([]);

  const getDrivings = async () => {
    try {
      const response = await fetch('http://localhost:3001/drivings');
      const drivingsData = await response.json();
      setDrivings(drivingsData);
    } catch (error) {
      console.error('Error retrieving drivings:', error);
    }
  };

  useEffect(() => {
    getDrivings();
  }, []);

  return (
    <div className='div6' style={{ display: 'flex', flexWrap: 'wrap' }}>
      {drivings.toReversed().map((driving) => (
        <div key={driving._id} className='p2' style={{ flex: '1 0 25%' }}>
          <Ajokerta driving={driving} />
        </div>
      ))}
    </div>
  );
}

export default Ajokerrat;