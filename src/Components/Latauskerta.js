import React, { useEffect, useState } from 'react';

const formatCustomDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

function Latauskerta() {
  const [loadings, setLoadings] = useState([]);
  const [loading, setLoading] = useState();

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
  
  useEffect(() => {
    if (loadings.length > 0) {
      setLoading(loadings[0]);
    }
  }, [loadings]);

  const formattedDate = loading && loading.date ? formatCustomDate(loading.date) : '';

  return (
    <div className='div5'>
      {loading && (
        <div>
          <p className='p2'>{formattedDate}</p>
          <table className='table'>
            <thead>
              <tr>
                <th>Latausaika</th>
                <th>kWh</th>
                <th>Snt/kWh</th>
                <th>Snt</th>
              </tr>
            </thead>
            <tbody>
              {loading.sntkWh.map((item, index) => (
                <tr key={index}>
                  <td>{item.hour}</td>
                  <td>{item.kWh.toFixed(6)}</td>
                  <td>{item.kWhPrice.toFixed(4)}</td>
                  <td>{item.price.toFixed(1)}</td>
                </tr>
              ))}
              <tr className='tr1'>
                <td>Yhteensä</td>
                <td>{loading.kWh}</td>
                <td>{(loading.price / loading.kWh).toFixed(4)}</td>
                <td>{loading.price.toFixed(1)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Latauskerta;