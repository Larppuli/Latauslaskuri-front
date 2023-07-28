import React, { useEffect, useState } from 'react';
import xlsxPopulate from 'xlsx-populate';

function Tiedostolataus1() {

    const [loadings, setLoadings] = useState([]);
  
    const getLoadings = async () => {
      try {
        const response = await fetch('http://localhost:3001/loadings');
        const loadingsData = await response.json();
        setLoadings(loadingsData);
      } catch (error) {
        console.error('Error retrieving loadings:', error);
      }
  }

  const handleDownload = async () => {
    try {
      const workbook = await xlsxPopulate.fromBlankAsync();
      const worksheet = workbook.sheet(0);
  
      let verIndex = 2;
      let horIndex = 1;
      loadings.forEach((loading) => {
        worksheet.cell(verIndex, horIndex + 1).value(loading.date.substring(0, 10)).style({
            border: {
                style: 'thick'
            },
            bold: true,
            horizontalAlignment: "center",
            fill: {
              type: 'solid',
              color: 'FDFFC0'
            }
          });
        worksheet.column(horIndex + 3).width(11);
  
        worksheet.cell(verIndex + 1, horIndex + 1).value("Latausaika").style({ horizontalAlignment: "center",
            border: {
                top: true,
                bottom: true,
                left: true,
                style: 'thick'
            },
            fill: {
              type: 'solid',
              color: 'E8E8E8'
            }
          });
          worksheet.column(horIndex + 1).width(14);

        worksheet.cell(verIndex + 1, horIndex + 2).value("kWh").style({ horizontalAlignment: "center",
            border: {
                top: true,
                bottom: true,
                style: 'thick'
          },
          fill: {
            type: 'solid',
            color: 'E8E8E8'
          }
        });
        worksheet.column(horIndex + 2).width(11);


        worksheet.cell(verIndex + 1, horIndex + 3).value("EUR/kWh").style({ horizontalAlignment: "center",
            border: {
                top: true,
                bottom: true,
                style: 'thick'
          },
          fill: {
            type: 'solid',
            color: 'E8E8E8'
          }
        });
        worksheet.cell(verIndex + 1, horIndex + 4).value("EUR").style({ horizontalAlignment: "center",
            border: {
                top: true,
                bottom: true,
                right: true,
                style: 'thick'
          },
          fill: {
            type: 'solid',
            color: 'E8E8E8'
          }
        });
        loading.sntkWh.forEach((object) => {
          verIndex += 1;
          worksheet.cell(verIndex + 1, horIndex + 1).value(object.hour).style({ horizontalAlignment: "center",
            border: {
                left: true
            } 
          });
          worksheet.cell(verIndex + 1, horIndex + 2).value(object.kWh.toFixed(3)).style({ horizontalAlignment: "center"});
          worksheet.cell(verIndex + 1, horIndex + 3).value((object.kWhPrice / 100).toFixed(5)).style({ horizontalAlignment: "center" });
          worksheet.cell(verIndex + 1, horIndex + 4).value((object.price / 100).toFixed(5)).style({ horizontalAlignment: "center",
            border: {
                right: true
            }   
          });
        });
        worksheet.cell(verIndex + 2, horIndex + 1).value("Yhteensä").style({ horizontalAlignment: "center",
            border: {
                top: true,
                bottom: true,
                left: true,
                style: 'thick'
            },
            bold: true,
        });
        worksheet.cell(verIndex + 2, horIndex + 2).value(loading.kWh).style({ horizontalAlignment: "center",
            border: {
                top: true,
                bottom: true,
                style: 'thick'
            },
            bold: true
        });
        worksheet.cell(verIndex + 2, horIndex + 4).value((loading.price / 100).toFixed(2)).style({ horizontalAlignment: "center",
            border: {
                top: true,
                bottom: true,
                right: true,
                style: 'thick'
            },
            bold: true
        });
        worksheet.cell(verIndex + 2, horIndex + 3).style({ horizontalAlignment: "center",
            border: {
                top: true,
                bottom: true,
                style: 'thick'
            } 
        });
        worksheet.cell(verIndex + 3, horIndex + 1).style({
        border: {
            left: true
            } 
        })
        worksheet.cell(verIndex + 3, horIndex + 4).style({
            border: {
                right: true
                } 
            })
        worksheet.cell(verIndex + 4, horIndex + 1).value(("Aloitusaika")).style({ horizontalAlignment: "center",
        border: {
            left: true
            } 
        })
        worksheet.cell(verIndex + 4, horIndex + 4).style({
        border: {
            right: true
            } 
        })
        worksheet.cell(verIndex + 4, horIndex + 2).value((loading.date.substring(11, 16))).style({ horizontalAlignment: "center" })
        worksheet.cell(verIndex + 5, horIndex + 1).value("Latausaika").style({ horizontalAlignment: "center",
        border: {
            left: true,
            bottom: true
            } 
        })
        worksheet.column(horIndex + 1).width(21);
        worksheet.cell(verIndex + 5, horIndex + 2).value(loading.hour + "h " + loading.minute+  "min").style({ horizontalAlignment: "center",
            border: {
                bottom: true
            } 
        })
        worksheet.cell(verIndex + 5, horIndex + 3).style({
        border: {
            bottom: true
            } 
        })
        worksheet.cell(verIndex + 5, horIndex + 4).style({
            border: {
                bottom: true,
                right: true
            } 
        })

        verIndex = 2;
        horIndex += 5;
      });
      worksheet.cell(18, 2).value("Sähkö yhteensä").style({
        horizontalAlignment: "center",
        border: {
          top: true,
          left: true,
        },
        fill: {
          type: 'solid',
          color: 'E8E8E8'
        }
      });

      worksheet.cell(18, 3).value(loadings[loadings.length - 1].totalKWh + " kWh").style({
        horizontalAlignment: "center",
        border: {
          top: true,
          right: true,
        },
        fill: {
          type: 'solid',
          color: 'E8E8E8'
        }
      });

      worksheet.cell(19, 2).value("Siirtomaksu per kWh").style({
        horizontalAlignment: "center",
        border: {
          left: true
        },
        fill: {
          type: 'solid',
          color: 'E8E8E8'
        }
      });

      worksheet.cell(19, 3).value("0.076132 €").style({
        horizontalAlignment: "center",
        border: {
          right: true
        },
        fill: {
          type: 'solid',
          color: 'E8E8E8'
        }
      });

      worksheet.cell(20, 2).value("Siirtomaksu yhteensä").style({
        horizontalAlignment: "center",
        border: {
          left: true
        },
        fill: {
          type: 'solid',
          color: 'E8E8E8'
        }
      });

      worksheet.cell(20, 3).value((loadings[loadings.length - 1].transportPrice/100).toFixed(2) + " €").style({
        horizontalAlignment: "center",
        border: {
          right: true
        },
        fill: {
          type: 'solid',
          color: 'E8E8E8'
        }
      });

      worksheet.cell(21, 2).value("Pörssisähkön marginaali").style({
        horizontalAlignment: "center",
        border: {
          left: true
        },
        fill: {
          type: 'solid',
          color: 'E8E8E8'
        }
      });

      worksheet.cell(21, 3).value((loadings[0].fixedPrice/100) + " €").style({
        horizontalAlignment: "center",
        border: {
          right: true
        },
        fill: {
          type: 'solid',
          color: 'E8E8E8'
        }
      });

      worksheet.cell(22, 2).value("Marginaali yhteensä").style({
        horizontalAlignment: "center",
        border: {
          left: true
        },
        fill: {
          type: 'solid',
          color: 'E8E8E8'
        }
      });

      worksheet.cell(22, 3).value((loadings[loadings.length - 1].totalFixedPrice/100).toFixed(5) + " €").style({
        horizontalAlignment: "center",
        border: {
          right: true
        },
        fill: {
          type: 'solid',
          color: 'E8E8E8'
        }
      });

      worksheet.cell(23, 2).value("Sähkö yhteensä").style({
        horizontalAlignment: "center",
        border: {
          left: true
        },
        fill: {
          type: 'solid',
          color: 'E8E8E8'
        }
      });

      worksheet.cell(23, 3).value((loadings[loadings.length - 1].totalElectricityPrice/100).toFixed(2) + " €").style({
        horizontalAlignment: "center",
        border: {
          right: true
        },
        fill: {
          type: 'solid',
          color: 'E8E8E8'
        }
      });

      worksheet.cell(24, 2).value("Veloitetaan").style({
        horizontalAlignment: "center",
        bold: true,
        border: {
            style: "thick"
        },
        fill: {
          type: 'solid',
          color: 'E8E8E8'
        }
      });

      worksheet.cell(24, 3).value((loadings[loadings.length - 1].totalPrice/100).toFixed(2) + " €").style({
        horizontalAlignment: "center",
        bold: true,
        border: {
            style: "thick"
        },
        fill: {
          type: 'solid',
          color: 'E8E8E8'
        }
      });
            
      const buffer = await workbook.outputAsync();
  
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
      const url = URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Porssisahko_latausveloitukset.xlsx';
      link.click();
    } catch (error) {
      console.error('Error generating Excel file:', error);
    }
  };

    useEffect(() => {
        getLoadings();
      }, []);

  return (
    <div className='div0'>
        <button className='nappi2' onClick={handleDownload} >Lataa tiedosto</button>
    </div>
  );
}

export default Tiedostolataus1;