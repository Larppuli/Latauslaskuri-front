import React, { useEffect, useState } from 'react';
import Latauskerta from './Latauskerta';

function Latauskerrat() {
  const [loadings, setLoadings] = useState([]);

  const getLoadings = async () => {
    try {
      const response = await fetch('http://localhost:3001/loadings');
      const loadingsData = await response.json();
      setLoadings(loadingsData);
    } catch (error) {
      console.error('Error retrieving loadings:', error);
    }
  };

  useEffect(() => {
    getLoadings();
  }, []);

  return (
    <div className='div6'>
      {loadings.toReversed().map((loading) => (
        <div key={loading._id} className='p2'>
          <Latauskerta loading={loading} />
        </div>
      ))}
    </div>
  );
}

export default Latauskerrat;