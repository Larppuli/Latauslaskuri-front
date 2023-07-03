import React, { useState, useEffect } from 'react';
import './styles.css';
import Hinta from './Components/Hinta';
import Mittarilukema1 from './Components/Mittarilukema1';
import Mittarilukema2 from './Components/Mittarilukema2';
import Nappi from './Components/Nappi';
import Aika from './Components/Aika';
import Tuntivalitsin from './Components/Tuntivalitsin';
import Kiintea from './Components/Kiintea';

function App() {

  const [lastFixedPrice, setLastFixedPrice] = useState();
  const [lastMeterNum, setLastMeterNum] = useState();
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [selectedStartingDate, setSelectedStartingDate] = useState();
  const [selectedStartingTime, setSelectedStartingTime] = useState();
  const [selectedMeterNum, setSelectedMeterNum] = useState();
  const [selectedFixedPrice, setSelectedFixedPrice] = useState();

  const handleHourChange = (hour) => {
    setSelectedHour(hour);
  };

  const handleMinuteChange = (minute) => {
    setSelectedMinute(minute);
  };

  const handleStartingDateChange = (date) => {
    setSelectedStartingDate(date);
  };
    
  const handleStartingTimeChange = (time) => {
    setSelectedStartingTime(time);
  };

  const handleMeterNumChange = (meterNum) => {
    setSelectedMeterNum(meterNum);
  };

  const handleFixedPriceChange = (fixedPrice) => {
    setSelectedFixedPrice(fixedPrice);
  };

  useEffect(() => {
    getLastItemMeterNum();
    getLastItemFixedPrice();
  }, []);

  const getLastItemMeterNum = async () => {
    try {
      const response = await fetch('http://localhost:3001/loadings');
  
      if (response.ok) {
        const data = await response.json();
        const lastItem = data[data.length - 1];  
        if (lastItem) {
          setLastMeterNum(lastItem.meterNum)
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

  const getLastItemFixedPrice = async () => {
    try {
      const response = await fetch('http://localhost:3001/loadings');
  
      if (response.ok) {
        const data = await response.json();
        const lastItem = data[data.length - 1];  
        if (lastItem) {
          setLastFixedPrice(lastItem.fixedPrice);
          setSelectedFixedPrice(lastItem.fixedPrice);
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

  const handleSave = async () => {
    console.log("minuutit", selectedMinute)
    console.log("tunnit", selectedHour)
    const startingDate = new Date(`${selectedStartingDate}T${selectedStartingTime}:00.000`);
    const endingDate = new Date(startingDate.getTime() + selectedMinute * 60000);
    endingDate.setMinutes(endingDate.getMinutes() + selectedHour * 60);

    const sntKWhArray = [];

    let date = startingDate;
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');

    for (let i = selectedHour * 60 + selectedMinute + date.getMinutes(); i > 1; i -= 60) {
      const response = await fetch(`http://localhost:3001/${year}-${month}-${day}%${date.getHours()}`);
      const jsonData = await response.json();
      sntKWhArray.push({ hour: date.getHours(), price: jsonData.price });
      date.setHours(startingDate.getHours() + 1);
      date = startingDate;
      year = date.getFullYear();
      month = String(date.getMonth() + 1).padStart(2, '0');
      day = String(date.getDate()).padStart(2, '0');
    }

    

    const newLoading = {
      date: `${selectedStartingDate}T${selectedStartingTime}:00.000+00:00`,
      hour: selectedHour,
      minute: selectedMinute,
      price: 1,
      kWh: parseFloat(selectedMeterNum - lastMeterNum).toFixed(2),
      meterNum: parseFloat(selectedMeterNum),
      sntkWh: sntKWhArray,
      fixedPrice: selectedFixedPrice,
    };

    if (
      selectedStartingDate &&
      (selectedHour || selectedMinute) &&
      selectedStartingTime &&
      selectedMeterNum &&
      selectedFixedPrice
    ) {
      try {
        const response = await fetch('http://localhost:3001/loadings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newLoading),
        });

        if (response.ok) {
          window.alert('Latauskerta tallennettu');
          console.log('Loading saved:', newLoading);
          window.location.reload();
        } else {
          window.alert('Jokin meni pieleen');
          console.error('Error saving loading:', response.status);
        }
      } catch (error) {
        console.error('Error saving loading:', error);
      }
    } else {
      window.alert('Täytä kaikki kentät');
    }
  };

  return (
    <div className="div0">
      <div className="div1">
        <Hinta />
        <Mittarilukema1 lastMeterNum={lastMeterNum} />
        <Aika
          selectedStartingTime={selectedStartingTime}
          selectedStartingDate={selectedStartingDate}
          onStartingTimeChange={handleStartingTimeChange}
          onStartingDateChange={handleStartingDateChange}
        />
        <Tuntivalitsin
          selectedHour={selectedHour}
          selectedMinute={selectedMinute}
          onHourChange={handleHourChange}
          onMinuteChange={handleMinuteChange}
        />
        <Mittarilukema2
          selectedMeterNum={selectedMeterNum}
          onMeterNumChange={handleMeterNumChange}
        />
        <Kiintea
          lastFixedPrice={lastFixedPrice}
          selectedFixedPrice={selectedFixedPrice}
          onFixedPriceChange={handleFixedPriceChange}
        />
        <Nappi onSave={handleSave} />
      </div>
    </div>
  );
}

export default App;