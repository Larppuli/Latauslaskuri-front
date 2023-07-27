import React, { useState, useEffect } from 'react';
import '../styles.css';
import Kilometrilukema1 from './Kilometrilukema1';
import Ajopaiva from './Ajopaiva';
import Kilometrilukema2 from './Kilometrilukema2';
import Yksityisajovalitsin from './Yksityisajovalitsin';
import Ajoaika from './Ajoaika';
import Ajoreitti from './Ajoreitti';
import Nappi from './Nappi';
import Ajovali from './Ajovali';
import Kuski from './Kuski';
import Ajokerrat from './Ajokerrat';
import Tiedostolataus2 from './Tiedostolataus2';
import Ajontarkoitus from './Ajontarkoitus';

function Paivakirja() {
  const [lastKilometer, setLastKilometer] = useState();
  const [selectedStartingDate, setSelectedStartingDate] = useState();
  const [selectedStartingTime, setSelectedStartingTime] = useState();
  const [selectedEndingTime, setSelectedEndingTime] = useState();
  const [selectedKilometer, setSelectedKilometer] = useState();
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState();
  const [selectedStartingPlace, setSelectedStartingPlace] = useState();
  const [selectedEndingPlace, setSelectedEndingPlace] = useState();
  const [selectedDriver, setSelectedDriver] = useState();
  const [selectedReason, setSelectedReason] = useState();


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

  const handleStartingPlaceChange = (place) => {
    setSelectedStartingPlace(place);
  };

  const handleEndingPlaceChange = (place) => {
    setSelectedEndingPlace(place);
  };

  const handleDriverChange = (driver) => {
    setSelectedDriver(driver);
  };

  const handleReasonChange = (reason) => {
    setSelectedReason(reason);
  };

  useEffect(() => {
    getLastItemLastKilometer();
  }, []);

  const handleSave = async () => {

    const newDriving = {
        date: selectedStartingDate,
        kilometerNum: selectedKilometer,
        kilometers: selectedKilometer - lastKilometer,
        lastKilometer: lastKilometer,
        isPrivateDriving: isEnabled ? 'Työajo' : 'Yksityisajo',
        startingTime: selectedStartingTime,
        endingTime: selectedEndingTime,
        route: selectedRoute,
        selectedStartingPlace: selectedStartingPlace,
        selectedEndingPlace: selectedEndingPlace,
        driver: selectedDriver,
        reason: isEnabled ? selectedReason : "Yksityisajo",
    }

    if (
        (!isEnabled && selectedStartingDate && selectedKilometer && selectedDriver) ||
         (isEnabled && selectedRoute && selectedStartingTime && selectedStartingDate && selectedKilometer && selectedDriver && selectedReason)
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
        <Tiedostolataus2/>
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
        <Kuski
          selectedDriver={selectedDriver}
          onDriverChange={handleDriverChange}
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
          <Ajovali
            selectedStartingPlace={selectedStartingPlace}
            selectedEndingPlace={selectedEndingPlace}
            onStartingPlaceChange={handleStartingPlaceChange}
            onEndingPlaceChange={handleEndingPlaceChange}
          />
          <Ajontarkoitus
            selectedReason={selectedReason}
            onReasonChange={handleReasonChange}
            />
        </div>
      )}
      <Nappi onSave={handleSave}/>
      <Ajokerrat/>
    </div>
  );
}


export default Paivakirja;