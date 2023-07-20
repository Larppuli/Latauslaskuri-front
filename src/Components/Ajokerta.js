import React from 'react';

const formatCustomDate = (dateString) => {
  const day = dateString.substring(8, 10);
  const month = dateString.substring(5, 7);
  const year = dateString.substring(0, 4);

  return `${day}.${month}.${year}`;
};

function Ajokerta({ driving }) {
  const formattedDate = loading && loading.date ? formatCustomDate(loading.date) : '';

  const handleDelete = async () => {
    const confirmed = window.confirm('Haluatko varmasti poistaa ajokerran?');
    
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:3001/drivings/${driving._id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        if (response.ok) {
          console.log('Object deleted successfully!');
          window.location.reload();
        } else {
          console.error('Failed to delete object');
        }
      } catch (error) {
        console.error('An error occurred while deleting the object:', error);
      }
    }
  };

  return (
    <div>
      {loading && (
        <div className='div5'>
          <div className='flex-container'>
            <p className='p2'>{formattedDate}</p>
            <button className="nappi1" onClick={handleDelete}>
              Poista
            </button>
          </div>
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
                  <td>{item.kWhPrice}</td>
                  <td>{item.price.toFixed(1)}</td>
                </tr>
              ))}
              <tr className='tr1'>
                <td>Yhteensä</td>
                <td>{loading.kWh}</td>
                <td>{(loading.price / loading.kWh).toFixed(3)}</td>
                <td>{loading.price.toFixed(0)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Ajokerta;