

function drawMap() {

  splitLoad();

  d3.select("h2").html("<h2>" + bezeichnung+ "("+datum+ ")" + "</h2>");

  function splitLoad(){
    console.log('Splitting monster function into small bit')
    cleanup();
    loadData();
  }

  function loadData(){
    d3.queue()
    .defer(d3.json, "data/geodata/map-TG.json")
    .defer(d3.csv, "data/gemeinden/auslagerung.csv")
    .defer(d3.csv, "data/indikatoren/"+ indikatorpath)
    .defer(d3.csv, "data/indikatoren/Parteistaerke_Gemeinde_2008.csv")
    .defer(d3.csv, "data/indikatoren/Parteistaerke_Gemeinde_2012.csv")
    .defer(d3.csv, "data/indikatoren/Parteistaerke_Gemeinde_2016.csv")
    .await(ready)
  }

  function ready(error, data, csvAbstimmung, csvParteien, partei08, partei12, partei16) {
    console.log(csvParteien);
    if (error) {
      console.log("Error: " + error)
    };  
  

  
  var dataset;

  var map_width = 960,
    map_height = 500;

  //#piechart
  var pie_width = 360;
  var pie_height = 480;
  function createMap(){
    
  }
  var svg = d3.select("#map").append("svg")
    .attr("width", map_width)
    .attr("height", map_height)
    .attr("transform", "translate(-30, 0)");

  canvas = d3.select("#piechart")
    .append("svg")
    .append("g")
    .attr("width", pie_width)
    .attr("height", pie_height)

  div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

   var r = Math.min(pie_width, pie_height) / 2.5; //var r = 180;

  //map colour scale
  var mapColour = d3.scaleThreshold()
    .domain([0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.51, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 1])
    .range(['#4c0000', '#99000d', '#cb181d', '#ef3b2c', '#fb6a4a', '#fc9272', '#fcbba1', '#fee5d9', "#cce5ff", '#99ccff', '#66b2ff', '#3299ff', '#0080ff', '#0066cc', '#004c99', '#003366', "#00264c"]);

  



    var abstimmung = csvAbstimmung.filter(function(d) {
      if (d["VORLAGE_BEZEICHNUNG"] == poll) return d;
    })
    dataset = data;

    //legend
    function drawLegend(scale) {
      d3.select('#legend').selectAll('ul').remove();

      var legend = d3.select('#legend')
        .append('ul')
        .attr('class', 'list-inline');

      var keys = legend.selectAll('li.key')
        .data(scale.range());

      var legendLabels = ["0%", "15%","20%","25%","30%","35%","40%","45%","51%","55%","60%","65%","70%","75%","80%","85%","100%",];

      keys.enter().append('li')
        .attr('class', 'key')
        .style('border-top-color', String)
        .text(function(d, i) {return legendLabels[i]; });
    }

    var Gemeinden = topojson.feature(data, data.objects.municipalities).features;

    //match id (topojson) & BFS_NR_GEMEINDE (csvAbstimmung)
    Gemeinden.forEach(function(gemeinde) {
      abstimmung.some(function(csvrow) {
        if (gemeinde.id == csvrow.BFS_NR_GEMEINDE) {
          gemeinde.properties.data = csvrow;
          return true;
        }
      });
    });
    
    switch (indikator){
      case 1:
        console.log("Starting with Parteien")
        if(datum < 2008){
          datumI = 2008;
          filteredData = partei08;
        }
        else if(datum < 2012){
          datumI = 2008;
          filteredData = partei08;
        }
        else if(datum < 2016){
          datumI = 2012;
          filteredData = partei12;
        }
        else //if(datum > 2018)
        {
          datumI = 2016;
          filteredData = partei16;
        }
        console.log(filteredData);
        break;
      case 2:
        datumI = "2010/2012";
        var filteredData = csvParteien
        break;
      case 3:
        console.log("Starting with Altersgruppen")
        console.log(datum)
        if(datum < 2004){
          console.log("Year too low")
          datumI = 2004;
        }
        if(datum > 2018){
          console.log("Year too high")
          datumI = 2017;
        }
        if (datum > 2004 && datum < 2018){datumI = datum;}
        var filteredData = csvParteien.filter(function(d) {
          if (d["Statistikjahr"] == datumI) return d;
        });
        break;
      case 4:
        console.log("Starting with Ausländer")
        console.log(datum)
        if(datum < 2015){
          console.log("Year too low")
          datumI = 2015;
        }
        if(datum > 2018){
          console.log("Year too high")
          datumI = 2017;
        }
        if (datum > 2015 && datum < 2018){datumI = datum;}
        var filteredData = csvParteien.filter(function(d) {
          if (d["Jahr"] == datumI) return d;
        });
        break;
        default:
          console.log("This does nuffin!");

    }
    console.log(filteredData)
    //match id (topojson) & BFS_NR_GEMEINDE (csvParteien)
    Gemeinden.forEach(function(gemeinde) {
      filteredData.some(function(csvrow) {
        if (gemeinde.id == csvrow.BFS_NR_GEMEINDE) {
          gemeinde.properties.data2 = csvrow;
          return true;
        }
      });
    });


    var path = d3.geoPath()
      .projection(null);

    drawLegend(mapColour);

    svg.append("g")
      .attr("class", "municipalities")
      .selectAll("path")
      .data(Gemeinden)
      .enter().append("path")
      .attr("id", function(d) {
        return d.id
      })
    .style('stroke', function (d){if (d.id == "9329") {
            return "white"
        }else {
            return '#000';
        }
        })
      //.property("data",function(d){return d.properties.data})
      .style("fill", function(d) {
        if (d.properties.data) {
          var percentage = parseInt(d.properties.data.JA_STIMMEN) / parseInt(d.properties.data.GUELTIGE_STIMMEN);
          /*console.log(percentage)*/
          ;
          return mapColour((percentage)); //Ja-Stimmen in Prozent
        } else if (d.id == "9329") {
          return "white"//"#2299ee"
        } //if lake fill white/blue
      })

      .on("mouseover", function(d) {
        d3.select(this)
          .style('stroke', function(d) {if (d.id == "9329") {
            return "white"
        }else {
            return '#a0a0a0';
            }
          })
          .style('stroke-width', function(d) {
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

      .on("mouseout", function(d) {
        d3.select(this)
           .style('stroke', function (d){if (d.id == "9329") {
            return "white"
        }else {
            return '#000';
        }
        })
          .style('stroke-width', '0.5');
        div.transition()
          .duration(500)
          .style("opacity", 0);
      })

      .on("click", function(d) { //function(e,f){
        d3.select('#piechart').select('h3').html(d.properties.data.GEMEINDE_NAME +" "+ datumI);
        switch (indikator){
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

        //console.log(d.properties.data2);
        //drawPiechart(d.properties.data2, r);
        //drawPiechartAuslaender(d.properties.data2);
      })

      .attr("d", path);



    function drawPiechart(data2) {
      //canvas.selectAll('path').remove();

      var filteredData = data2;
      console.log(filteredData);

      delete filteredData.BEZIRK_NAME;
      delete filteredData.BEZIRK_NR;
      delete filteredData.BFS_NR_GEMEINDE;
      delete filteredData.GEMEINDE_NAME;
      delete filteredData.Wahljahr;

      var piedata = [];
      for (var key in filteredData) {
        piedata.push({
          party: key,
          votes: filteredData[key]
        })
      };

      console.log(piedata)

      var pie = d3.pie()
        .value(function(d) {
          return d.votes;
        });
      //Farbskala Pie Chart
      var colorpie = d3.scaleOrdinal()
        .range(["#6a51a3", "#08306b", "green", "red", "orange", "#2171b5", "#67000d", "#c7e9c0", "#ffff00"])

      var arc = d3.arc()
        .innerRadius(50) //if inner radius is 0 then it becomes a pie chart
        .outerRadius(r);


      d3.selectAll("#piechart")
        //.append("svg")
        //.attr("width", "500")
        //.attr("height", "500")
        .select("svg")
        .append("g")
        .attr("transform", "translate(180,160)")
        .selectAll("path")
        .data(pie(piedata))
        .enter()
        .append("path")
        .attr("d", arc)
        .style("stroke", "black")
        .style("stroke-width", "1px")
        .attr("fill", function(d, i) {
          return colorpie(piedata[i].party);
        })


        .on("mouseover", function(d, i) {
          d3.select(this)
            .style('stroke', function(d) {
              return '#a0a0a0';
            })
            .style('stroke-width', function(d) {
              return '1';
            });
          div.transition()
            .duration(200)
            .style("opacity", .9);
          div.html("<strong>" + "Partei: " + "</strong>" + piedata[i].party + "<br/>" + "<strong>" + "Anteil: " + "</strong>" + piedata[i].votes + "%")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        })

          .on("mouseout", function(d, i) {
            d3.select(this)
              .style('stroke', function(d) {
                return 'black';
              })
              .style('stroke-width', function(d) {
                return '1';
              });
      });


      //prepare Legend
      var legendRectSize = 12,
        legendSpacing = 4;


      var legend =  d3.selectAll("#piechart")
        .select("svg")
        .append("g")
        .selectAll('.legend')
        .data(colorpie.domain())
        .enter()
        .append('g')
        .attr('class', 'legend')

        .attr('transform', function(d, i) {
          var height = legendRectSize + legendSpacing;
          var offset = height * colorpie.domain().length / 2;
          var horz, vert;
          if (i < 5) {
            horz = (i * legendRectSize * 5.4) + 35; // -2 * legendRectSize;
            vert = 360; // i * height - offset;
          } else {
            horz = ((i - 5) * legendRectSize * 5.4) + 35;
            vert = height + 370;
          }

          return 'translate(' + horz + ',' + vert + ')';

        });

      legend.append('rect')
        .attr('width', legendRectSize)
        //.style('display', function(d, i) {return (i == 0) ? 'none' : 'initial';})
        .attr('height', legendRectSize)
        .style('fill', colorpie)
        .style('stroke', colorpie)
        .style("stroke-width", 2);

      legend.append('text')
        .attr('x', legendRectSize + legendSpacing +10)
        .attr('y', legendRectSize - legendSpacing +2)
        .text(function(d, i) {
          return piedata[i].party;
        }).style("fill", "#00")
        .style('font-family', 'sans-serif').style("display", function(d) {
          return (d == 'root') ? 'none' : 'initial';
        });

    }



    /*
    	//Histogramm

                  //filter nach Jahr -> ersetzen
                  var filteredhistoData = csvSteuerfuss.filter(function(d) {
                      return d.Jahr === "2017";
                  });

                  //histogram
                    var xScale = d3.scaleLinear().domain([0, 100]).range([0, 330]);
                    var yScale = d3.scaleLinear().domain([0, 80]).range([330,0]);
                    var xAxis = d3.axisBottom().scale(xScale).ticks(18)
                    var histoChart = d3.histogram();

                    histoChart
                        .domain([0, 100])
                        .thresholds([5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95])
                        .value(function (d) {return d.Gemeindesteuerfuss;})

                    histoData = histoChart(filteredhistoData);

                    //console.log(histoData);

                        canvas.selectAll("rect")
                        .data(histoData).enter()
                        .append("rect")
                        .attr("x", d => xScale(d.x0))
                        .attr("y", d => yScale(d.length))
                        .attr("width", d => xScale(d.x1 - d.x0) -2)
                        .attr("height", d => 330 - yScale(d.length))
                        .style("fill", "black")
                        .attr("transform", "translate(20, 10)");

                  // add the x Axis
                    //d3.select("svg")
                    canvas.append("g").attr("class", "x axis")
                        .attr("transform", "translate(20, 340)").call(xAxis); // 340 -> 330 (range) + 10 (translate)
                    d3.select("g axis").selectAll("text").attr("dx", 50);

                  //add y axis
            canvas.append("g")
                  .call(d3.axisLeft(yScale))
    		.attr("transform", "translate(20, 10)");
    */

  };
}
