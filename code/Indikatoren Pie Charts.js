// Pie Chart Parteien 2008, 2012, 2016
function drawPiechartParteien(data2, r) {
  var filteredData = data2;

  console.log(filteredData);

  //Farbskala Pie Chart
  var colorpie = d3.scaleOrdinal()
    .range(["#6a51a3", "#08306b", "green", "red", "orange", "#2171b5", "#67000d", "#c7e9c0", "#ffff00", "#ff69b4"])

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

  var arc = d3.arc()
    .innerRadius(80) //if inner radius is 0 then it becomes a pie chart
    .outerRadius(r);

  var pie = d3.pie()
    .value(function(d) {
      return d.votes;
    });


  d3.selectAll("#piechart")
    .select("svg")
    .append("g")
    .attr("id", "pie")
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


  //prepare Legend
  var legendRectSize = 12,
    legendSpacing = 4;

  var legend = d3.selectAll("#piechart")
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
    .attr('height', legendRectSize)
    .style('fill', colorpie)
    .style('stroke', colorpie)
    .style("stroke-width", 2);

  legend.append('text')
    .attr('x', legendRectSize + legendSpacing +15)
    .attr('y', legendRectSize - legendSpacing +2)
    .text(function(d, i) {
      return piedata[i].party;
    }).style("fill", "#00")
    .style('font-family', 'sans-serif').style("display", function(d) {
      return (d == 'root') ? 'none' : 'initial';
    })
	.style("font-size", "13px");

}




//Pie Chart Auslaender 2015-2017
function drawPiechartAuslaender(data2, r) {
  var filteredData = data2;
  //Farbskala Pie Chart
  var colorpie = d3.scaleOrdinal()
    .range(["#ff0000", "#0059b2"])
  /*
          var filteredAusland = csvAusland.filter(function(d) {
              return d.Jahr === "2017";
              });
    */
  delete filteredData.Auslaender_Prozent;
  delete filteredData.Total;
  delete filteredData.BFS_NR_GEMEINDE;
  delete filteredData.GEMEINDE_NAME;
  delete filteredData.Jahr;


  var piedata = [];
  for (var key in filteredData) {
    piedata.push({
      Herkunft: key,
      Anteil: filteredData[key]
    })
  };

  console.log(piedata)


  var arc = d3.arc()
    .innerRadius(80) //if inner radius is 0 then it becomes a pie chart
    .outerRadius(r);

  var pie = d3.pie()
    .value(function(d) {
      return d.Anteil;
    });
  var sum = 0;
  piedata.forEach(function(k){
    sum += parseInt(k.Anteil);
  })
  d3.selectAll("#piechart")
    .select("svg")
    .append("g")
    .attr("id", "pie")
    .attr("transform", "translate(180,160)")
    .selectAll("path")
    .data(pie(piedata))
    .enter()
    .append("path")
    .attr("d", arc)
    .style("stroke", "black")
    .style("stroke-width", "1px")
    .attr("fill", function(d, i) {
      return colorpie(piedata[i].Herkunft);
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
      div
        .html("<strong>" + "Herkunft: " + "</strong>" + piedata[i].Herkunft + "<br/>" + "<strong>" + "Anteil: " + "</strong>" + Math.round(piedata[i].Anteil/sum*100, 2) + "%")
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
    });

  //prepare Legend

  var legendRectSize = 12,
    legendSpacing = 4;

  var legend = d3.selectAll("#piechart")
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
    .attr('height', legendRectSize)
    .style('fill', colorpie)
    .style('stroke', colorpie)
    .style("stroke-width", 2);

  legend.append('text')
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing)
    .text(function(d, i) {
      return piedata[i].Herkunft;
    }).style("fill", "#00")
    .style('font-family', 'sans-serif').style("display", function(d) {
      return (d == 'root') ? 'none' : 'initial';
    });

}



//Pie Chart Haushaltstyp
function drawPiechartHaushalt(data2, r) {
  var filteredData = data2;

  //Farbskala Pie Chart
  var colorpie = d3.scaleOrdinal()
    .range(["#ff0000", "#0059b2", "#6a51a3", "green", "orange"])

  delete filteredData.Total;
  delete filteredData.BFS_NR_GEMEINDE;
  delete filteredData.GEMEINDE_NAME;

  var piedata = [];
  for (var key in filteredData) {
    piedata.push({
      Haushaltstyp: key,
      Anteil: filteredData[key]
    })
  };

  console.log(piedata)

  var arc = d3.arc()
    .innerRadius(80) //if inner radius is 0 then it becomes a pie chart
    .outerRadius(r);
  var sum = 0;
  var pie = d3.pie()
    .value(function(d) {
      return d.Anteil;
    });

  piedata.forEach(function(k){
    sum += parseInt(k.Anteil);
  })
  d3.selectAll("#piechart")
    .select("svg")
    .append("g")
    .attr("id", "pie")
    .attr("transform", "translate(180,160)")
    .selectAll("path")
    .data(pie(piedata))
    .enter()
    .append("path")
    .attr("d", arc)
    .style("stroke", "black")
    .style("stroke-width", "1px")
    .attr("fill", function(d, i) {
      return colorpie(piedata[i].Haushaltstyp);
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
      div
        .html("<strong>" + "Haushaltstyp: " + "</strong>" + piedata[i].Haushaltstyp + "<br/>" + "<strong>" + "Anteil: " + "</strong>" + Math.round((piedata[i].Anteil/sum)*100,0) + "%")
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
    });

  //prepare Legend

  var legendRectSize = 12,
    legendSpacing = 4;

  var legend = d3.selectAll("#piechart")
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
        horz = ((i - 4) * legendRectSize * 5.4) + 35;
        vert = height + 370;
      }
      return 'translate(' + horz + ',' + vert + ')';
    });

  legend.append('rect')
    .attr('width', legendRectSize)
    .attr('height', legendRectSize)
    .style('fill', colorpie)
    .style('stroke', colorpie)
    .style("stroke-width", 2);

  legend.append('text')
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing)
    .text(function(d, i) {
      return piedata[i].Haushaltstyp;
    }).style("fill", "#00")
    .style('font-family', 'sans-serif').style("display", function(d) {
      return (d == 'root') ? 'none' : 'initial';
    });

}



// Pie Chart Altersgruppen 2004-2017
function drawPiechartAlter(data2, r) {
  var filteredData = data2;

  //Farbskala Pie Chart
  var colorpie = d3.scaleOrdinal()
    .range(["#ff0000", "#0059b2", "#6a51a3", "green", "orange"])

  delete filteredData.Total;
  delete filteredData.BFS_NR_GEMEINDE;
  delete filteredData.Gemeinde;
  delete filteredData.Statistikjahr;

  var piedata = [];
  for (var key in filteredData) {
    piedata.push({
      Altersgruppe: key,
      Anteil: filteredData[key]
    })
  };

  console.log(piedata)

  var arc = d3.arc()
    .innerRadius(80) //if inner radius is 0 then it becomes a pie chart
    .outerRadius(r);

  var pie = d3.pie()
    .value(function(d) {
      return d.Anteil;
    });

  d3.selectAll("#piechart")
    .select("svg")
    .append("g")
    .attr("id", "pie")
    .attr("transform", "translate(180,160)")
    .selectAll("path")
    .data(pie(piedata))
    .enter()
    .append("path")
    .attr("d", arc)
    .style("stroke", "black")
    .style("stroke-width", "1px")
    .attr("fill", function(d, i) {
      return colorpie(piedata[i].Altersgruppe);
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
      div
        .html("<strong>" + "Altersgruppe: " + "</strong>" + piedata[i].Altersgruppe + "<br/>" + "<strong>" + "Anteil: " + "</strong>" + piedata[i].Anteil + "%")
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
    });

  //prepare Legend

  var legendRectSize = 12,
    legendSpacing = 4;

  var legend = d3.selectAll("#piechart")
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
        horz = ((i - 4) * legendRectSize * 5.4) + 35;
        vert = height + 370;
      }
      return 'translate(' + horz + ',' + vert + ')';
    });

  legend.append('rect')
    .attr('width', legendRectSize)
    .attr('height', legendRectSize)
    .style('fill', colorpie)
    .style('stroke', colorpie)
    .style("stroke-width", 2);

  legend.append('text')
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing)
    .text(function(d, i) {
      return piedata[i].Altersgruppe;
    }).style("fill", "#00")
    .style('font-family', 'sans-serif').style("display", function(d) {
      return (d == 'root') ? 'none' : 'initial';
    });

}







/* Diese Funktionen stimmen noch nicht, sind noch nicht auf Wechsel zwischen Gemeinden angepasst

//Pie Chart Beschäftigte Sektoren 2000-2014
function drawPiechartSektoren() {

            //Farbskala Pie Chart
			var colorpie = d3.scaleOrdinal()
				.range(["green", "#ff0000", "#0059b2"])

      canvas.selectAll('path').remove();

            var piefilteredData = csvSektoren.filter(function(d) {
                return d.BFS_NR_GEMEINDE === "4551";
                });


            var piedata = []
                piefilteredData.forEach(function(d) {
                    piedata.push({Sektor: '1. Sektor', Anteil: d.Anteil_Sektor1_2014})
                    piedata.push({Sektor: '2. Sektor', Anteil: d.Anteil_Sektor2_2014})
                    piedata.push({Sektor: '3. Sektor', Anteil: d.Anteil_Sektor3_2014})

            })

            var arc = d3.arc()
				.innerRadius(80) //if inner radius is 0 then it becomes a pie chart
				.outerRadius(r);

			var pie = d3.pie()
				.value(function (d) {return d.Anteil;});

            var arcs = canvas.selectAll(".arc")
				.data(pie(piedata))
				.enter()
				.append("g")
                .attr("class", "arc");

			arcs.append("path")
				.attr("d", arc)

                  .on("mouseover", function(d) {
                     d3.select(this)
                        .style('stroke', function (d) {
                            return '#a0a0a0';
                        })
                        .style('stroke-width', function (d) {
                            return '1';
                        });

                        div.transition()
                            .duration(200)
                            .style("opacity", .9);
                        div
                            .html("<strong>" + "Sektor: " + "</strong>" + piedata.Sektor + "<br/>" + "<strong>" + "Anteil: " + "</strong>" + piedata.Anteil + "%")
                            .style("left", (d3.event.pageX) + "px")
                            .style("top", (d3.event.pageY - 28) + "px");
                    })


                .attr("fill", function (d) {return colorpie (d.value);});


    //prepare Legend

    var legendRectSize = 12,
        legendSpacing = 4;

    var legend = canvas.selectAll('.legend')
        .data(colorpie.domain())
        .enter()
        .append('g')
        .attr('class', 'legend')
       .attr('transform', function(d, i) {
            var height = legendRectSize + legendSpacing;
            var offset =  height * colorpie.domain().length / 2;
            var horz, vert;
            if(i<5){
                horz = (i * legendRectSize*5.4)-75; // -2 * legendRectSize;
                vert = 215;// i * height - offset;
            }else{
                horz = ((i-4) * legendRectSize*5.4)-75;
                vert = height +225;
            }

            return 'translate(' + horz + ',' + vert + ')';

        });

    legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', colorpie)
        .style('stroke', colorpie)
        .style("stroke-width", 2);

    legend.append('text')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .text(function(d) { return d; }).style("fill","#00")
        .style('font-family','sans-serif').style("display",function(d){
            return (d=='root')? 'none':'initial';
        });

}




// Pie Chart Ausländer 2005-2013
function drawPiechartAuslaender2005_2013(data2) {

            //Farbskala Pie Chart
			var colorpie = d3.scaleOrdinal()
				.range(["#ff0000", "#0059b2"])

            var piefilteredData = csvAusland.filter(function(d) {
                return d.BFS_NR_GEMEINDE === "4551";
                });

           var piedata = []
                piefilteredData.forEach(function(d) {
                    piedata.push({Herkunft: 'Schweiz', Anteil: 100 - d.Auslaenderanteil_Prozent_2014})
                    piedata.push({Herkunft: 'Ausland', Anteil: d.Auslaenderanteil_Prozent_2014})
            })

    console.log(piedata);

            var arc = d3.arc()
				.innerRadius(80) //if inner radius is 0 then it becomes a pie chart
				.outerRadius(r);

			var pie = d3.pie()
				.value(function (d) {return d.Anteil;});

            var arcs = canvas.selectAll(".arc")
				.data(pie(piedata))
				.enter()
				.append("g")
                .attr("class", "arc");

			arcs.append("path")
				.attr("d", arc)

                  .on("mouseover", function(d) {
                     d3.select(this)
                        .style('stroke', function (d) {
                            return '#a0a0a0';
                        })
                        .style('stroke-width', function (d) {
                            return '1';
                        });

                        div.transition()
                            .duration(200)
                            .style("opacity", .9);
                        div
                            .html("<strong>" + "Herkunft: " + "</strong>" + piedata.Herkunft + "<br/>" + "<strong>" + "Anteil: " + "</strong>" + piedata.Anteil + "%")
                            .style("left", (d3.event.pageX) + "px")
                            .style("top", (d3.event.pageY - 28) + "px");
                    })


                .attr("fill", function (d) {return colorpie (d.value);});


    //prepare Legend

    var legendRectSize = 12,
        legendSpacing = 4;

    var legend = canvas.selectAll('.legend')
        .data(colorpie.domain())
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', function(d, i) {
            var height = legendRectSize + legendSpacing;
            var offset =  height * colorpie.domain().length / 2;
            var horz, vert;
            if(i>0){
                horz = -80;
                vert = 215;

            }else{
                horz = 40;
                vert = 215;
            }
            return 'translate(' + horz + ',' + vert + ')';
        });

    legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', colorpie)
        .style('stroke', colorpie)
        .style("stroke-width", 2);

    legend.append('text')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .text(function(d) { return d; }).style("fill","#00")
        .style('font-family','sans-serif').style("display",function(d){
            return (d=='root')? 'none':'initial';
        });

}

*/
