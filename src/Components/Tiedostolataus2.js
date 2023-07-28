import React, { useEffect, useState } from 'react';
import xlsxPopulate from 'xlsx-populate';

function Tiedostolataus2() {
  const [drivings, setDrivings] = useState([]);

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

  const handleDownload = async () => {

    let index = 7;
    try {
      const monthName = IntToMonth({ monthNumber: parseInt(drivings[0].date.substring(6, 8)) });
      const fileName = `Ajopäiväkirja_${monthName}_${parseInt(drivings[0].date.substring(0, 4))}.xlsx`;
  
      const workbook = await xlsxPopulate.fromBlankAsync();
      const worksheet = workbook.sheet(0);
  
        worksheet.cell(2, 2).value("AJOPÄIVÄKIRJA SZB-435").style({
            bold: true
        });
    
        worksheet.cell(2, 5).value(monthName).style({
            bold: true,
            horizontalAlignment: "center",
        });

        worksheet.cell(6, 2).value("Päivä").style({
            bold: true,
            horizontalAlignment: "center",
            border: true,
            fill: {
                type: 'solid',
                color: 'D9E1F2'
            }
        });

        worksheet.column(2).width(10);
        
        worksheet.cell(6, 3).value("Alkoi").style({
            bold: true,
            horizontalAlignment: "center",
            border: true,
            fill: {
                type: 'solid',
                color: 'D9E1F2'
            }
        });

        worksheet.cell(6, 4).value("Loppui").style({
            bold: true,
            horizontalAlignment: "center",
            border: true,
            fill: {
                type: 'solid',
                color: 'D9E1F2'
            }
        });

        worksheet.cell(5, 3).value("Ajo").style({
            bold: true,
            horizontalAlignment: "center",
            border: true,
            fill: {
                type: 'solid',
                color: 'D9E1F2'
            }
        });
        worksheet.range("C5:D5").merged(true);

        worksheet.cell(5, 4).style({
            bold: true,
            horizontalAlignment: "center",
            border: true,
            fill: {
                type: 'solid',
                color: 'D9E1F2'
            }
        });

        worksheet.cell(6, 5).value("Alkamispaikka").style({
            bold: true,
            horizontalAlignment: "center",
            border: true,
            fill: {
                type: 'solid',
                color: 'D9E1F2'
            }
            
        });
        worksheet.column(5).width(15);
        
        worksheet.cell(6, 6).value("Päättymispaikka").style({
            bold: true,
            horizontalAlignment: "center",
            border: true,
            fill: {
                type: 'solid',
                color: 'D9E1F2'
            }
        });
        worksheet.column(6).width(15);
            
        worksheet.cell(6, 7).value("Ajoreitti").style({
            bold: true,
            horizontalAlignment: "center",
            border: true,
            fill: {
                type: 'solid',
                color: 'D9E1F2'
            }
        });
        worksheet.column(7).width(37);

        worksheet.cell(6, 8).value("Alussa").style({
            bold: true,
            horizontalAlignment: "center",
            border: true,
            fill: {
                type: 'solid',
                color: 'D9E1F2'
            }
        });

        worksheet.cell(6, 9).value("Lopussa").style({
            bold: true,
            horizontalAlignment: "center",
            border: true,
            fill: {
                type: 'solid',
                color: 'D9E1F2'
            }
        });

        worksheet.cell(5, 8).value("Kilometrilukema").style({
            bold: true,
            horizontalAlignment: "center",
            border: true,
            fill: {
                type: 'solid',
                color: 'D9E1F2'
            }
        });

        worksheet.range("H5:I5").merged(true);

        worksheet.cell(5, 9).style({
            bold: true,
            horizontalAlignment: "center",
            border: true,
            fill: {
                type: 'solid',
                color: 'D9E1F2'
            }
        });

        worksheet.cell(6, 10).value("Matkan pituus").style({
            bold: true,
            horizontalAlignment: "center",
            border: true,
            fill: {
                type: 'solid',
                color: 'D9E1F2'
            }
        });

        worksheet.column(10).width(14);

        worksheet.cell(6, 11).value("Ajon tarkoitus").style({
            bold: true,
            horizontalAlignment: "center",
            border: true,
            fill: {
                type: 'solid',
                color: 'D9E1F2'
            }
        });

        worksheet.column(11).width(20);


        worksheet.cell(6, 12).value("Käyttäjä").style({
            bold: true,
            horizontalAlignment: "center",
            border: true,
            fill: {
                type: 'solid',
                color: 'D9E1F2'
            }
        });

        worksheet.column(12).width(14);

        worksheet.cell(6, 13).value("Luokittelu").style({
            bold: true,
            horizontalAlignment: "center",
            border: true,
            fill: {
                type: 'solid',
                color: 'D9E1F2'
            }
        });

        worksheet.column(13).width(16);

        worksheet.cell(6, 14).value("Yksitysajo km").style({
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

            worksheet.cell(8, 16).value("* Vapaassa autoedussa perusarvoon lisättävästä käyttökustannusten osuudesta vähennetään:");
            worksheet.cell(9, 16).value("1.     0,08 euroa kilometriltä tai 120 euroa kuukaudessa, jos auton ainoa mahdollinen käyttövoima on sähkö.");
            worksheet.cell(10, 16).value("2.     0,04 euroa kilometriltä tai 60 euroa kuukaudessa, jos ulkoisesta lähteestä ladattavan auton käyttövoima on sähkö ja moottoribensiini tai sähkö ja dieselöljy taikka auton käyttövoima on metaanista koostuva polttoaine.");

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