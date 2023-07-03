import React, { useEffect, useState } from 'react';

function Hinta() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const hour = date.getHours();

    const day = String(date.getDate()).padStart(2, '0');
    try {
      const response = await fetch(`http://localhost:3001/${year}-${month}-${day}%${hour}`);
      const jsonData = await response.json();
      setData(jsonData.price);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="div2">
      {data ? (
          <div>
            <p className="p1">Sähkön hinta on</p>
            <p><b className='b1'>{data}</b> snt/kWh</p>
          </div>
      ) : (
        <p>Sähkön hinta on...</p>
      )}
    </div>
  );
}

export default Hinta;