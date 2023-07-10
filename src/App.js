import React, { useState, useEffect } from 'react';
import './styles.css';
import Hinta from './Components/Hinta';
import Mittarilukema1 from './Components/Mittarilukema1';
import Mittarilukema2 from './Components/Mittarilukema2';
import Nappi from './Components/Nappi';
import Aika from './Components/Aika';
import Tuntivalitsin from './Components/Tuntivalitsin';
import Kiintea from './Components/Kiintea';
import Latauskerrat from './Components/Latauskerrat';
import Tiedostolataus from './Components/Tiedostolataus';

function App() {

  const [lastFixedPrice, setLastFixedPrice] = useState();
  const [lastMeterNum, setLastMeterNum] = useState();
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [selectedStartingDate, setSelectedStartingDate] = useState();
  const [selectedStartingTime, setSelectedStartingTime] = useState();
  const [selectedMeterNum, setSelectedMeterNum] = useState();
  const [selectedFixedPrice, setSelectedFixedPrice] = useState();
  const [totalFixedPrice, setTotalFixedPrice] = useState(0);
  const [totalKWh, setTotalKWh] = useState(0);
  const [totalTransportPrice, setTotalTransportPrice] = useState(0);
  const [electricityPrice, setElectricityPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

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

  const handleLastMeterNumChange = (lastMeterNum) => {
    setLastMeterNum(lastMeterNum);
  };

  const handleFixedPriceChange = (fixedPrice) => {
    setSelectedFixedPrice(fixedPrice);
  };

  useEffect(() => {
    getPreviousValues();
    getLastItemFixedPrice();
  }, []);

  const getPreviousValues = async () => {
    try {
      const response = await fetch('http://localhost:3001/loadings');
  
      if (response.ok) {
        const data = await response.json();
        const lastItem = data[data.length - 1];  
        if (lastItem) {
          setLastMeterNum(lastItem.meterNum)
          setTotalFixedPrice(lastItem.totalFixedPrice || 0)
          setTotalKWh(lastItem.totalKWh || 0)
          setTotalTransportPrice(lastItem.transportPrice || 0)
          setElectricityPrice(lastItem.totalElectricityPrice || 0)
          setTotalPrice(lastItem.totalPrice || 0)
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
    const startingDate = new Date(`${selectedStartingDate}T${selectedStartingTime}:00.000`);
    const endingDate = new Date(startingDate.getTime() + selectedMinute * 60000);
    endingDate.setMinutes(endingDate.getMinutes() + selectedHour * 60);
    const finalKWh = parseFloat(selectedMeterNum - lastMeterNum).toFixed(2);
    const finalTime = selectedMinute + selectedHour * 60
    let finalPrice = 0;

    const sntKWhArray = [];

    let date = startingDate;
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');

    for (let i = selectedHour * 60 + selectedMinute + date.getMinutes(); i > 1; i -= 60) {
      const response = await fetch(`http://localhost:3001/${year}-${month}-${day}%${date.getHours()}`);
      const jsonData = await response.json();
      const formattedHour = date.getHours().toString().padStart(2, '0') + ':00';

      if (i === selectedHour * 60 + selectedMinute + date.getMinutes()) {
        const timeShare = (60 - startingDate.getMinutes()) / finalTime;
        const price = parseFloat(timeShare * finalKWh * parseFloat(jsonData.price));
        sntKWhArray.push({ hour: formattedHour, kWhPrice: jsonData.price, price: price, kWh: timeShare * finalKWh });
        finalPrice += price;
      }
      else if (i  >= 60) {
        const price = parseFloat((60 / finalTime) * finalKWh * parseFloat(jsonData.price));
        sntKWhArray.push({ hour: formattedHour, kWhPrice: jsonData.price, price: price, kWh: (60 / finalTime) * finalKWh });
        finalPrice += price;
      }
      else {
        const price = endingDate.getMinutes() / finalTime * finalKWh * parseFloat(jsonData.price);
        sntKWhArray.push({ hour: formattedHour, kWhPrice: jsonData.price, price: price, kWh: endingDate.getMinutes() / finalTime * finalKWh });
        finalPrice += price;
      }
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
      price: finalPrice < 0 ? 0 : finalPrice,
      kWh: finalKWh,
      meterNum: parseFloat(selectedMeterNum),
      sntkWh: sntKWhArray,
      fixedPrice: selectedFixedPrice,
      totalFixedPrice: totalFixedPrice + finalKWh * selectedFixedPrice,
      totalKWh: parseFloat(totalKWh) + parseFloat(finalKWh),
      transportPrice: totalTransportPrice + finalKWh * 7.6132,
      totalElectricityPrice: electricityPrice + (finalPrice < 0 ? 0 : finalPrice),
      totalPrice: totalPrice + (finalPrice < 0 ? 0 : finalPrice) + finalKWh * 7.6132 + finalKWh * selectedFixedPrice
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
          window.alert('Valittu päivämäärä on liian kaukana tulevaisuudessa');
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
        <Tiedostolataus/>
        <Hinta />
        <Mittarilukema1
          lastMeterNum={lastMeterNum}
          onLastMeterNumChange={handleLastMeterNumChange}
        />
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
        <Latauskerrat />
      </div>
    </div>
  );
}

export default App;