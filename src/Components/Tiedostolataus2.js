import React, { useEffect, useState } from 'react';
import xlsxPopulate from 'xlsx-populate';

function Tiedostolataus2() {
  const [drivings, setDrivings] = useState([]);
  const [settings, setSettings] = useState();


  const getDrivings = async () => {
    try {
      const response = await fetch('http://localhost:3001/drivings');
      const drivingsData = await response.json();
      setDrivings(drivingsData);
    } catch (error) {
      console.error('Error retrieving drivings:', error);
    }
  };

  const IntToMonth = ({ monthNumber}) => {
    const months = [
      'Tammikuu', 'Helmikuu', 'Maaliskuu', 'Huhtikuu', 'Toukokuu', 'Kesäkuu',
      'Heinäkuu', 'Elokuu', 'Syyskuu', 'Lokakuu', 'Marraskuu', 'Joulukuu'
    ];
  
    const monthName = months[monthNumber - 1] || 'Invalid Month';
  
    return monthName;
  };

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

useEffect(() => {
    getSettings();
  }, []);

  const handleDownload = async () => {

    let index = 17;
    try {
      const monthName = IntToMonth({ monthNumber: parseInt(drivings[0].date.substring(6, 8)) });
      const fileName = `Ajopäiväkirja_${monthName}_${parseInt(drivings[0].date.substring(0, 4))}.xlsx`;
  
      const workbook = await xlsxPopulate.fromBlankAsync();
      const worksheet = workbook.sheet(0);
  
        worksheet.cell(2, 2).value(`AJOPÄIVÄKIRJA ${settings.regNum}`).style({
            bold: true
        });
    
        worksheet.cell(2, 6).value(monthName).style({
            bold: true,
            horizontalAlignment: "center",
        });

        worksheet.cell(3, 2).value(`Ajoneuvo`)

        worksheet.cell(3, 6).value(settings.carName).style({
            horizontalAlignment: "center",
        });

        worksheet.cell(4, 2).value(`Luovutuspäivä`)

        worksheet.cell(4, 6).value(settings.handoverDate).style({
            horizontalAlignment: "center",
        });

        worksheet.cell(5, 2).value(`Kilometrimäärä luovutettaessa`)

        worksheet.cell(5, 6).value(settings.kmAtBeginning).style({
            horizontalAlignment: "center",
        });

        worksheet.cell(6, 2).value(`Autoedun antaja`)

        worksheet.cell(6, 6).value(settings.beneficiary).style({
            horizontalAlignment: "center",
        });

        worksheet.cell(7, 2).value(`Ajoneuvo`)

        worksheet.cell(7, 6).value(settings.benefactor).style({
            horizontalAlignment: "center",
        });

        worksheet.cell(8, 2).value(`Ajoneuvo`)

        worksheet.cell(8, 6).value(settings.carName).style({
            horizontalAlignment: "center",
        });

        worksheet.cell(10, 2).value(`Vapaa autoetu sisältäen kiinteän 270 euron lisäyksen`)

        worksheet.cell(10, 6).value(settings.carBenefitDefault + settings.fixedAdd).style({
            horizontalAlignment: "center",
        });

        worksheet.cell(11, 2).value(`Kiinteä lisä`)

        worksheet.cell(11, 6).value(`-${settings.fixedAdd}`).style({
            horizontalAlignment: "center",
        });

        worksheet.cell(12, 2).value(`perusarvo`).style({
            bold: true
        });

        worksheet.cell(12, 6).value(settings.carBenefitDefault).style({
            horizontalAlignment: "center",
            bold: true
        });

        worksheet.cell(13, 2).value(`Kilometrikohtainen autoedun määrä*`)

        worksheet.cell(13, 6).value(settings.benefitPerKm).style({
            horizontalAlignment: "center",
        });
        
        worksheet.cell(16, 2).value("Päivä").style({
            bold: true,
            horizontalAlignment: "center",
            border: true,
            fill: {
                type: 'solid',
                color: 'D9E1F2'
            }
        });

        worksheet.column(2).width(10);
        
        worksheet.cell(16, 3).value("Alkoi").style({
            bold: true,
            horizontalAlignment: "center",
            border: true,
            fill: {
                type: 'solid',
                color: 'D9E1F2'
            }
        });

        worksheet.cell(16, 4).value("Loppui").style({
            bold: true,
            horizontalAlignment: "center",
            border: true,
            fill: {
                type: 'solid',
                color: 'D9E1F2'
            }
        });

        worksheet.cell(15, 3).value("Ajo").style({
            bold: true,
            horizontalAlignment: "center",
            border: true,
            fill: {
                type: 'solid',
                color: 'D9E1F2'
            }
        });
        worksheet.range("C15:D15").merged(true);

        worksheet.cell(15, 4).style({
            bold: true,
            horizontalAlignment: "center",
            border: true,
            fill: {
                type: 'solid',
                color: 'D9E1F2'
            }
        });

        worksheet.cell(16, 5).value("Alkamispaikka").style({
            bold: true,
            horizontalAlignment: "center",
            border: true,
            fill: {
                type: 'solid',
                color: 'D9E1F2'
            }
            
        });
        worksheet.column(5).width(15);
        
        worksheet.cell(16, 6).value("Päättymispaikka").style({
            bold: true,
            horizontalAlignment: "center",
            border: true,
            fill: {
                type: 'solid',
                color: 'D9E1F2'
            }
        });
        worksheet.column(6).width(15);
            
        worksheet.cell(16, 7).value("Ajoreitti").style({
            bold: true,
            horizontalAlignment: "center",
            border: true,
            fill: {
                type: 'solid',
                color: 'D9E1F2'
            }
        });
        worksheet.column(7).width(37);

        worksheet.cell(16, 8).value("Alussa").style({
            bold: true,
            horizontalAlignment: "center",
            border: true,
            fill: {
                type: 'solid',
                color: 'D9E1F2'
            }
        });

        worksheet.cell(16, 9).value("Lopussa").style({
            bold: true,
            horizontalAlignment: "center",
            border: true,
            fill: {
                type: 'solid',
                color: 'D9E1F2'
            }
        });

        worksheet.cell(15, 8).value("Kilometrilukema").style({
            bold: true,
            horizontalAlignment: "center",
            border: true,
            fill: {
                type: 'solid',
                color: 'D9E1F2'
            }
        });

        worksheet.range("H15:I15").merged(true);

        worksheet.cell(15, 9).style({
            bold: true,
            horizontalAlignment: "center",
            border: true,
            fill: {
                type: 'solid',
                color: 'D9E1F2'
            }
        });

        worksheet.cell(16, 10).value("Matkan pituus").style({
            bold: true,
            horizontalAlignment: "center",
            border: true,
            fill: {
                type: 'solid',
                color: 'D9E1F2'
            }
        });

        worksheet.column(10).width(14);

        worksheet.cell(16, 11).value("Ajon tarkoitus").style({
            bold: true,
            horizontalAlignment: "center",
            border: true,
            fill: {
                type: 'solid',
                color: 'D9E1F2'
            }
        });

        worksheet.column(11).width(20);


        worksheet.cell(16, 12).value("Käyttäjä").style({
            bold: true,
            horizontalAlignment: "center",
            border: true,
            fill: {
                type: 'solid',
                color: 'D9E1F2'
            }
        });

        worksheet.column(12).width(14);

        worksheet.cell(16, 13).value("Luokittelu").style({
            bold: true,
            horizontalAlignment: "center",
            border: true,
            fill: {
                type: 'solid',
                color: 'D9E1F2'
            }
        });

        worksheet.column(13).width(16);

        worksheet.cell(16, 14).value("Yksitysajo km").style({
            bold: true,
            horizontalAlignment: "center",
            border: true,
            fill: {
                type: 'solid',
                color: 'D9E1F2'
            }
        });

        worksheet.column(14).width(14);

        drivings.forEach((driving) => {
            worksheet.cell(index, 2).value(`${driving.date.substring(8, 10)}.${driving.date.substring(5, 7)}.${driving.date.substring(0, 4)}`).style({
                horizontalAlignment: "center",
                border: true,
            });

            worksheet.cell(index, 3).value(driving.startingTime ? driving.startingTime : '',).style({
                horizontalAlignment: "center",
                border: true,
            });

            worksheet.cell(index, 4).value(driving.endingTime ? driving.endingTime : '',).style({
                horizontalAlignment: "center",
                border: true,
            });

            worksheet.cell(index, 5).value(driving.startingPlace ? driving.startingPlace : '',).style({
                horizontalAlignment: "center",
                border: true,
            });

            worksheet.cell(index, 6).value(driving.endingPlace ? driving.endingPlace : '',).style({
                horizontalAlignment: "center",
                border: true,
            });

            worksheet.cell(index, 7).value(driving.route ? driving.route : '',).style({
                horizontalAlignment: "center",
                border: true,
            });

            worksheet.cell(index, 8).value(driving.lastKilometer).style({
                horizontalAlignment: "center",
                border: true,
            });

            worksheet.cell(index, 9).value(driving.kilometerNum).style({
                horizontalAlignment: "center",
                border: true,
            });

            worksheet.cell(index, 10).value(driving.kilometers).style({
                horizontalAlignment: "center",
                border: true,
            });

            worksheet.cell(index, 11).value(driving.reason ? driving.reason : 'Yksityisajo').style({
                horizontalAlignment: "center",
                border: true,
            });

            worksheet.cell(index, 12).value(driving.driver).style({
                horizontalAlignment: "center",
                border: true,
            });

            worksheet.cell(index, 13).value(driving.isPrivateDriving).style({
                horizontalAlignment: "center",
                border: true,
            });

            worksheet.cell(index, 14).value(driving.isPrivateDriving==="Yksityisajo" ? driving.kilometers : 0 ).style({
                horizontalAlignment: "center",
                border: true,
            });

            worksheet.cell(18, 16).value("* Vapaassa autoedussa perusarvoon lisättävästä käyttökustannusten osuudesta vähennetään:");
            worksheet.cell(19, 16).value("1.     0,08 euroa kilometriltä tai 120 euroa kuukaudessa, jos auton ainoa mahdollinen käyttövoima on sähkö.");
            worksheet.cell(20, 16).value("2.     0,04 euroa kilometriltä tai 60 euroa kuukaudessa, jos ulkoisesta lähteestä ladattavan auton käyttövoima on sähkö ja moottoribensiini tai sähkö ja dieselöljy taikka auton käyttövoima on metaanista koostuva polttoaine.");

            index += 1;
        });
        worksheet.cell(index + 1, 2).value("Päivämäärä ja allekirjoitus").style({
            italic: true
        });
        worksheet.cell(index + 2, 5).value("Timo Talvitie").style({
            border:{
                top: true
            },
            horizontalAlignment: "center",
         });

         worksheet.range(index + 2, 5, index + 2, 6).merged(true);

         worksheet.cell(index + 2, 6).style({
            border:{
                top: true
            }
        })

        worksheet.cell(index , 12).value("Kuukauden yksityisajot yhteensä km");

        let totalKilometers = 0;
        drivings.forEach((driving) => {

            if (driving.isPrivateDriving === "Yksityisajo") {
              totalKilometers += driving.kilometers;
            }
          });
    
          worksheet.cell(index, 14).value(totalKilometers).style({
            horizontalAlignment: "center"
         });

         worksheet.column(12).width(18);

         worksheet.cell(index + 1 , 12).value("Kilometrikohtainen arvo per km");
         worksheet.cell(index + 1 , 14).value(settings.benefitPerKm).style({
            horizontalAlignment: "center"
         });
         worksheet.cell(index + 2 , 12).value("Kilometrikohtainen arvo yhteensä (EUR)");
         worksheet.cell(index + 2 , 14).value(settings.benefitPerKm * totalKilometers).style({
            horizontalAlignment: "center"
         });
         worksheet.cell(index + 3 , 12).value("Luontaisedun perusarvo (EUR)");
         worksheet.cell(index + 3 , 14).value(settings.carBenefitDefault).style({
            horizontalAlignment: "center"
         });
         worksheet.cell(index + 4 , 12).value("Kuukauden luontaisetu yhteensä (EUR)").style({
            bold: true,
            border: {
                left: true,
                bottom: true,
                top: true
            },
            fill: {
                type: 'solid',
                color: 'E2EFDA'
            }
        });

        worksheet.cell(index + 4 , 14).value(settings.carBenefitDefault + settings.benefitPerKm * totalKilometers).style({
            bold: true,
            horizontalAlignment: "center",
            border: {
                right: true,
                bottom: true,
                top: true
            },
            fill: {
                type: 'solid',
                color: 'E2EFDA'
            }
        });

        
        worksheet.cell(index + 4 , 13).style({
            border: {
                bottom: true,
                top: true
            },
            fill: {
                type: 'solid',
                color: 'E2EFDA'
            }
        });
        
      const buffer = await workbook.outputAsync();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();
    } catch (error) {
      console.error('Error generating Excel file:', error);
    }
  };

  useEffect(() => {
    getDrivings();
  }, []);

  return (
    <div className='div0'>
      <button className='nappi2' onClick={handleDownload}>Lataa tiedosto</button>
    </div>
  );
}

export default Tiedostolataus2;