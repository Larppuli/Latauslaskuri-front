import React from 'react';

const formatCustomDate = (dateString) => {
  const day = dateString.substring(8, 10);
  const month = dateString.substring(5, 7);
  const year = dateString.substring(0, 4);

  return `${day}.${month}.${year}`;
};

function Ajokerta({ driving }) {
  const formattedDate = driving && driving.date ? formatCustomDate(driving.date) : '';

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
      {driving && (
        <div className='div8'>
          <div className='flex-container'>
            <p className='p2'>{formattedDate}</p>
            <button className="nappi1" onClick={handleDelete}>
              Poista
            </button>
          </div>
          <table className='table'>
            <thead>
              <tr>
                <th>Kuski</th>
                <th>Pituus</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{(driving.driver)}</td>
                <td>{driving.kilometers} km</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Ajokerta;