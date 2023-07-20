import React, { useState, useEffect } from 'react';
import '../styles.css';
import Kilometrilukema1 from './Kilometrilukema1';
import Tiedostolataus from './Tiedostolataus';
import Ajopaiva from './Ajopaiva';
import Kilometrilukema2 from './Kilometrilukema2';
import Yksityisajovalitsin from './Yksityisajovalitsin';
import Ajoaika from './Ajoaika';
import Ajoreitti from './Ajoreitti';
import Nappi from './Nappi';

function Paivakirja() {
  const [lastKilometer, setLastKilometer] = useState();
  const [selectedStartingDate, setSelectedStartingDate] = useState();
  const [selectedStartingTime, setSelectedStartingTime] = useState();
  const [selectedEndingTime, setSelectedEndingTime] = useState();
  const [selectedKilometer, setSelectedKilometer] = useState();
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState();


  const handleLastKilometerChange = (lastKilometer) => {
    setLastKilometer(lastKilometer);
  };

  const handleKilometerChange = (kilometer) => {
    setSelectedKilometer(kilometer);
  };

  const handleStartingDateChange = (date) => {
    setSelectedStartingDate(date);
  };
    
  const handleStartingTimeChange = (time) => {
    setSelectedStartingTime(time);
  };

  const handleEndingTimeChange = (time) => {
    setSelectedEndingTime(time);
  };

  const handleSwitchChange = (isEnabled) => {
    setIsEnabled(isEnabled);
  };

  const handleRouteChange = (route) => {
    setSelectedRoute(route);
  };

  useEffect(() => {
    getLastItemLastKilometer();
  }, []);

  const handleSave = async () => {

    const newDriving = {
        date: selectedStartingDate,
        kilometerNum: selectedKilometer,
        kilometers: selectedKilometer - lastKilometer,
        isPrivateDriving: !isEnabled,
        startingTime: selectedStartingTime,
        endingTime: selectedEndingTime,
        route: selectedRoute
    }

    if (
        (!isEnabled && selectedStartingDate && selectedKilometer) ||
         (isEnabled && selectedRoute && selectedStartingTime && selectedStartingDate && selectedKilometer)
      ) {
        try {
          const response = await fetch('http://localhost:3001/drivings', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newDriving),
          });
  
          if (response.ok) {
            window.alert('Ajokerta tallennettu');
            window.location.reload();
          } 

        } catch (error) {
          console.error('Error saving driving:', error);
        }
      } else {
        window.alert('Täytä kaikki kentät');
      }

    console.log("Painallus")
  }

  const getLastItemLastKilometer = async () => {
    try {
      const response = await fetch('http://localhost:3001/drivings');
  
      if (response.ok) {
        const data = await response.json();
        const lastItem = data[data.length - 1];  
        if (lastItem) {
          setLastKilometer(lastItem.kilometerNum)
        } else {
          console.log('No items found');
        }
      } else {
        console.error('Error fetching loadings:', response.status);
      }
    } catch (error) {
      console.error('Error fetching loadings:', error);
    }
  };

  return (
    <div className='div1'>
        <Tiedostolataus/>
        <Kilometrilukema1
          lastKilometer={lastKilometer}
          onLastKilometerChange={handleLastKilometerChange}
        />
        <Ajopaiva
          selectedStartingDate={selectedStartingDate}
          onStartingDateChange={handleStartingDateChange}
        />
        <Kilometrilukema2
          selectedKilometer={selectedKilometer}
          onKilometerChange={handleKilometerChange}
        />
        <Yksityisajovalitsin onChange={handleSwitchChange} checked={isEnabled} />
        {isEnabled && (
        <div>
          <Ajoaika
            selectedStartingTime={selectedStartingTime}
            onStartingTimeChange={handleStartingTimeChange}
            selectedEndingTime={selectedEndingTime}
            onEndingTimeChange={handleEndingTimeChange}
          />
          <Ajoreitti
            selectedRoute={selectedRoute}
            onRouteChange={handleRouteChange}
          />
        </div>
      )}
      <Nappi onSave={handleSave}/>
    </div>
  );
}


export default Paivakirja;