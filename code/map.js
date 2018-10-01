function drawMap() {
  var map_width = 960,
    map_height = 500,
    pie_width = 360,
    pie_height = 480;
  var r = Math.min(pie_width, pie_height) / 2.5; //var r = 180;
  var mapColour = d3.scaleThreshold()
    .domain([0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.51, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 1])
    .range(['#4c0000', '#99000d', '#cb181d', '#ef3b2c', '#fb6a4a', '#fc9272', '#fcbba1', '#fee5d9', "#cce5ff", '#99ccff', '#66b2ff', '#3299ff', '#0080ff', '#0066cc', '#004c99', '#003366', "#00264c"]);

  splitLoad();

  d3.select("h2").html("<h2>" + bezeichnung + "(" + datum + ")" + "</h2>");

  function splitLoad() {
    console.log('Splitting monster function into small bit')
    cleanup();
    loadData();
    drawLegend(mapColour);
  }

  function loadData() {
    d3.queue()
      .defer(d3.json, "data/geodata/map-TG.json")
      .defer(d3.csv, "data/gemeinden/auslagerung.csv")
      .defer(d3.csv, "data/indikatoren/" + indikatorpath)
      .defer(d3.csv, "data/indikatoren/Parteistaerke_Gemeinde_2008.csv")
      .defer(d3.csv, "data/indikatoren/Parteistaerke_Gemeinde_2012.csv")
      .defer(d3.csv, "data/indikatoren/Parteistaerke_Gemeinde_2016.csv")
      .await(ready)
  }

  function drawLegend(scale) {
    d3.select('#legend').selectAll('ul').remove();
    var legend = d3.select('#legend')
      .append('ul')
      .attr('class', 'list-inline');
    var keys = legend.selectAll('li.key')
      .data(scale.range());
    var legendLabels = ["0%", "15%", "20%", "25%", "30%", "35%", "40%", "45%", "51%", "55%", "60%", "65%", "70%", "75%", "80%", "85%", "100%", ];
    keys.enter().append('li')
      .attr('class', 'key')
      .style('border-top-color', String)
      .text(function (d, i) {
        return legendLabels[i];
      });
  }

  function ready(error, data, csvAbstimmung, csvParteien, partei08, partei12, partei16) {
    if (error) {
      console.log("Error: " + error)
    };
    /**
     * Preparing Data
     */
    function prepareData() {
      var filteredData;
      switch (indikator) {
        case 1:
          console.log("Starting with Parteien")
          if (datum < 2008) {
            datumI = 2008;
            filteredData = partei08;
          } else if (datum < 2012) {
            datumI = 2008;
            filteredData = partei08;
          } else if (datum < 2016) {
            datumI = 2012;
            filteredData = partei12;
          } else //if(datum > 2018)
          {
            datumI = 2016;
            filteredData = partei16;
          }
          console.log(filteredData);
          break;
        case 2:
          datumI = "2010/2012";
          filteredData = csvParteien
          break;
        case 3:
          console.log("Starting with Altersgruppen")
          console.log(datum)
          if (datum < 2004) {
            console.log("Year too low")
            datumI = 2004;
          }
          if (datum > 2018) {
            console.log("Year too high")
            datumI = 2017;
          }
          if (datum > 2004 && datum < 2018) {
            datumI = datum;
          }
          filteredData = csvParteien.filter(function (d) {
            if (d["Statistikjahr"] == datumI) return d;
          });
          break;
        case 4:
          console.log("Starting with Ausländer")
          console.log(datum)
          if (datum < 2015) {
            console.log("Year too low")
            datumI = 2015;
          }
          if (datum > 2018) {
            console.log("Year too high")
            datumI = 2017;
          }
          if (datum > 2015 && datum < 2018) {
            datumI = datum;
          }
          filteredData = csvParteien.filter(function (d) {
            if (d["Jahr"] == datumI) return d;
          });
          break;
        default:
          console.log("This does nuffin!");
      }
      return filteredData;
    }
    console.log(csvParteien);
    var filteredData = prepareData();
    var path = d3.geoPath().projection(null);
    var abstimmung = csvAbstimmung.filter(function (d) {
      if (d["VORLAGE_BEZEICHNUNG"] == poll) return d;
    })
    var Gemeinden = topojson.feature(data, data.objects.municipalities).features;
    Gemeinden.forEach(function (gemeinde) {
      abstimmung.some(function (csvrow) {
        if (gemeinde.id == csvrow.BFS_NR_GEMEINDE) {
          gemeinde.properties.data = csvrow;
          return true;
        }
      });
    });
    Gemeinden.forEach(function (gemeinde) {
      filteredData.some(function (csvrow) {
        if (gemeinde.id == csvrow.BFS_NR_GEMEINDE) {
          gemeinde.properties.data2 = csvrow;
          return true;
        }
      });
    });

    /**
     * Drawing Maps and Piecharts
     */
    canvas = d3.select("#piechart")
      .append("svg")
      .append("g")
      .attr("width", pie_width)
      .attr("height", pie_height)

    div = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);




    var svg = d3.select("#map").append("svg")
      .attr("width", map_width)
      .attr("height", map_height)
      .attr("transform", "translate(-30, 0)");
    svg.append("g")
      .attr("class", "municipalities")
      .selectAll("path")
      .data(Gemeinden)
      .enter().append("path")
      .attr("id", function (d) {
        return d.id
      })
      .style('stroke', function (d) {
        if (d.id == "9329") {
          return "white"
        } else {
          return '#000';
        }
      })
      .style("fill", function (d) {
        if (d.properties.data) {
          var percentage = parseInt(d.properties.data.JA_STIMMEN) / parseInt(d.properties.data.GUELTIGE_STIMMEN);
          return mapColour((percentage)); //Ja-Stimmen in Prozent
        } else if (d.id == "9329") {
          return "white"
        }
      })
      .on("mouseover", function (d) {
        d3.select(this)
          .style('stroke', function (d) {
            if (d.id == "9329") {
              return "white"
            } else {
              return '#a0a0a0';
            }
          })
          .style('stroke-width', function (d) {
            return '1';
          });

        div.transition()
          .duration(200)
          .style("opacity", .9);

        div
          .html("<strong>" + d.properties.data.GEMEINDE_NAME + "</strong>" + "<br/>" + "Ja-Stimmen: " + Math.round(parseInt(d.properties.data.JA_STIMMEN) / parseInt(d.properties.data.GUELTIGE_STIMMEN) * 100) * 100 / 100 + "%" + "<br/>" + "Stimmbeteiligung: " + d.properties.data.STIMMBETEILIGUNG + "%")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function (d) {
        d3.select(this)
          .style('stroke', function (d) {
            if (d.id == "9329") {
              return "white"
            } else {
              return '#000';
            }
          })
          .style('stroke-width', '0.5');
        div.transition()
          .duration(500)
          .style("opacity", 0);
      })
      .on("click", function (d) {
        d3.select('#piechart').select('h3').html(d.properties.data.GEMEINDE_NAME + " " + datumI);
        switch (indikator) {
          case 1:
            drawPiechartParteien(d.properties.data2, r);
            break;
          case 2:
            drawPiechartHaushalt(d.properties.data2, r);
            break;
          case 3:
            drawPiechartAlter(d.properties.data2, r);
            break;
          case 4:
            drawPiechartAuslaender(d.properties.data2, r);
            break;
        }
      })
      .attr("d", path);
  };
}