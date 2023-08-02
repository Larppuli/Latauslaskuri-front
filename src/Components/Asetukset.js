import React, {useState, useEffect} from 'react';
import Tekstiasetus from './Tekstiasetus';
import Paivavalitsin from './Paivavalitsin';
import Numeroasetus from './Numeroasetus';
import Nappi from './Nappi';

function Asetukset() {
    const [selectedVehicle, setSelectedVehicle] = useState();
    const [selectedRegNum, setSelectedRegNum] = useState();
    const [selectedHandoverDate, setSelectedHandoverDate] = useState();
    const [selectedBenefactor, setSelectedBenefactor] = useState();
    const [selectedBeneficiary, setSelectedBeneficiary] = useState();
    const [selectedBenefitPerKm, setSelectedBenefitPerKm] = useState();
    const [selectedKmAtBeginning, setSelectedKmAtBeginning] = useState();
    const [selectedFixedAdd, setSelectedFixedAdd] = useState();
    const [selectedCarBenefitDefault, setSelectedCarBenefitDefault] = useState();
    const [selectedFixPerKwh, setSelectedFixPerKwh] = useState();
    const [settings, setSettings] = useState({});

    const handleVehicleChange = (vehicle) => {
        setSelectedVehicle(vehicle);
      };

    const handleRegNumChange = (regNum) => {
        setSelectedRegNum(regNum);
      };

    const handleHandoverDateChange = (date) => {
        setSelectedHandoverDate(date);
      };

    const handleBenefactorChange = (benefactor) => {
        setSelectedBenefactor(benefactor);
      };

    const handleBeneficiaryChange = (beneficiary) => {
        setSelectedBeneficiary(beneficiary);
      };

    const handleBenefitPerKmChange = (benefitPerKm) => {
        setSelectedBenefitPerKm(benefitPerKm);
      };

    const handleKmAtBeginningChange = (kmAtBeginning) => {
        setSelectedKmAtBeginning(kmAtBeginning);
      };

    const handleFixedAddChange = (fixedAdd) => {
        setSelectedFixedAdd(fixedAdd);
      };

    const handleCarBenefitDefaultChange = (carBenefitDefault) => {
        setSelectedCarBenefitDefault(carBenefitDefault);
      };

    const handleFixPerKwhChange = (fixPerKwh) => {
        setSelectedFixPerKwh(fixPerKwh);
      };

    useEffect(() => {
        getSettings();
      }, []);

    const getSettings = async () => {
    try {
      const response = await fetch('http://localhost:3001/settings');
  
      if (response.ok) {
        const data = await response.json();
        setSettings(data[data.length - 1]);  
      } else {
        console.error('Error fetching settings:', response.status);
       }
    } catch (error) {
      console.error('Error fetching loadings:', error);
    }
};

      const handleSave = async () => {

        const newSetting = {
            carName: selectedVehicle,
            regNum: selectedRegNum,
            handoverDate: selectedHandoverDate,
            kmAtBeginning: selectedKmAtBeginning,
            benefactor: selectedBenefactor,
            beneficiary: selectedBeneficiary,
            benefitPerKm: selectedBenefitPerKm,
            fixedAdd: selectedFixedAdd,
            carBenefitDefault: selectedCarBenefitDefault,
            fixPerKWh: selectedFixPerKwh
        }
    
        if (selectedVehicle && selectedRegNum && selectedHandoverDate && selectedKmAtBeginning && selectedBenefactor && selectedBeneficiary && selectedFixedAdd && selectedCarBenefitDefault && selectedFixPerKwh) {
            try {
              const response = await fetch('http://localhost:3001/settings', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSetting),
              });
      
              if (response.ok) {
                window.alert('Muutokset tallennettu');
              } 
    
            } catch (error) {
              console.error('Error editing settings:', error);
            }
          } else {
            window.alert('Täytä kaikki kentät');
          }
      }

  return (
    <div className='div9'>
        <div className='p3'>Ajopäiväkirja</div>
        <Tekstiasetus 
            selectedValue={selectedVehicle}
            onValueChange={handleVehicleChange}
            name="Ajoneuvo"
            defaultValue={settings.carName}/>
        <Tekstiasetus
            selectedValue={selectedRegNum}
            onValueChange={handleRegNumChange}
            name="Rekisterinumero"
            defaultValue={settings.regNum}/>
        <Paivavalitsin
            selectedStartingDate={selectedHandoverDate}
            onStartingDateChange={handleHandoverDateChange}
            text="Luovutuspäivä"
            defaultValue={settings.handoverDate}/>
        <Tekstiasetus
            selectedValue={selectedBenefactor}
            onValueChange={handleBenefactorChange} 
            name="Autoedun antaja"
            defaultValue={settings.benefactor}/>
        <Tekstiasetus
            selectedValue={selectedBeneficiary}
            onValueChange={handleBeneficiaryChange} 
            name="Autoedun saaja"
            defaultValue={settings.beneficiary}/>
        <Numeroasetus 
            selectedValue={selectedBenefitPerKm}
            onValueChange={handleBenefitPerKmChange} 
            name="Kilometrikohtainen autoedun määrä (€)"
            defaultValue={settings.benefitPerKm}/>
        <Numeroasetus 
            selectedValue={selectedKmAtBeginning}
            onValueChange={handleKmAtBeginningChange} 
            name="Kilometrimäärä luovutettaessa"
            defaultValue={settings.kmAtBeginning}/>
        <Numeroasetus 
            selectedValue={selectedFixedAdd}
            onValueChange={handleFixedAddChange} 
            name="Kiinteä lisä (€)"
            defaultValue={settings.fixedAdd}/>
        <Numeroasetus 
            selectedValue={selectedCarBenefitDefault}
            onValueChange={handleCarBenefitDefaultChange} 
            name="Vapaa autoedun perusarvo (€)"
            defaultValue={settings.carBenefitDefault}/>
        <div className='p3'>Latauslaskuri</div>
        <Numeroasetus 
            selectedValue={selectedFixPerKwh}
            onValueChange={handleFixPerKwhChange} 
            name="Kiinteä kilowattitunnin lisähinta (€)"
            defaultValue={settings.fixPerKWh            }/>
        <Nappi className='div3' onSave={handleSave}/>
    </div>
  );
}

export default Asetukset;