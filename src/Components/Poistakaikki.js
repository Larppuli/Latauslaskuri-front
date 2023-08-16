import React from 'react';

function Poistakaikki({object}) {

    const handleDeleteAll = async () => {
        const confirmed = window.confirm('Haluatko varmasti poistaa kaikki tallennetut kerrat?');
      
        if (confirmed) {
          try {
            const response = await fetch(`http://localhost:3001/${object}`, {
              method: 'DELETE',
            });
      
            if (response.ok) {
              window.alert('Kaikki kerrat poistettu');
              window.location.reload();
            } else {
              window.alert('Error deleting loadings');
            }
          } catch (error) {
            console.error('Error deleting loadings:', error);
          }
        }
      };

  return (
    <div className='div0'>
        <button className='nappi2' onClick={handleDeleteAll} >Poista kaikki</button>
    </div>
  );
}

export default Poistakaikki;