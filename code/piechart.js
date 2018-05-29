function initPie(){

  var pie = d3.select("#piechart")
    .append("html")
    .attr("id", "pietitle")
    .html("<h4>This is It!</h4>")

  pie
  .append("svg")
  .attr("id", "pie")
  .attr("width", 400)
  .attr("height", 400)
  .style("border", "1px solid black")
}

function drawPiechart(d, csvParteien){

  d3.select('#pietitle').html(d.properties.data.GEMEINDE_NAME);
  var filteredDataGemeinde = d.properties.data2; //Daten von angeklickter Gemeinde
  console.log("Hi")
  console.log(filteredDataGemeinde);
  // d3.select('#piechart').selectAll('svg').remove();
  //Filter & push labels -> ersetzen
  var piefilteredData = csvParteien.filter(function(d) {
    return d.BFS_NR_GEMEINDE === "4551";
  });
  var piedata = []
  piefilteredData.forEach(function(d) {
    piedata.push({
      party: 'EDU',
      votes: d.EDU
    })
    piedata.push({
      party: 'EVP',
      votes: d.EVP
    })
    piedata.push({
      party: 'GP',
      votes: d.GP
    })
    piedata.push({
      party: 'SP',
      votes: d.SP
    })
    piedata.push({
      party: 'CVP',
      votes: d.CVP
    })
    piedata.push({
      party: 'FDP',
      votes: d.FDP
    })
    piedata.push({
      party: 'SVP',
      votes: d.SVP
    })
    piedata.push({
      party: 'glp',
      votes: d.glp
    })
    piedata.push({
      party: 'BDP',
      votes: d.BDP
    })
  })
  var width2= 100;
  var height2 = 100;


  var r = Math.min(width2, height2) / 4; //var r = 180;

  //Farbskala Pie Chart
  var colorpie = d3.scaleOrdinal()
    .range(["#6a51a3", "#08306b", "green", "red", "orange", "#2171b5", "#67000d", "#c7e9c0", "#ffff00"])

  var arc = d3.arc()
    .innerRadius(50) //if inner radius is 0 then it becomes a pie chart
    .outerRadius(r);

  var pie = d3.pie()
    .value(function(d) {
      return d.votes;
    });
  canvas = d3.select("#pie")
  var arcs = canvas.selectAll(".arc")
    .data(pie(piedata))
    .enter()
    .append("g")
    .attr("class", "arc")
    .attr("transform", "translate(200,200)");
  arcs.append("path")
    .attr("d", arc)
    .on("mouseover", function(d) {

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
      div.html("<strong>" + "Partei: " + "</strong>" + piedata.party + "<br/>" + "<strong>" + "Anteil: " + "</strong>" + piedata.votes + "%")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
    })
    .attr("fill", function(d) {
      return colorpie(d.value);
    });


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
      var offset = height * colorpie.domain().length / 2;
      var horz, vert;
      if (i < 5) {
        horz = (i * legendRectSize * 5.4) - 155; // -2 * legendRectSize;
        vert = 205; // i * height - offset;
      } else {
        horz = ((i - 4) * legendRectSize * 5.4) - 155;
        vert = height + 215;
      }

      return 'translate(' + horz + ',' + vert + ')';

    });

  legend.append('rect')
    .attr('width', legendRectSize)
    .style('display', function(d, i) {
      return (i == 0) ? 'none' : 'initial';
    })
    .attr('height', legendRectSize)
    .style('fill', colorpie)
    .style('stroke', colorpie)
    .style("stroke-width", 2);

  legend.append('text')
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing)
    .text(function(d) {
      return d;
    }).style("fill", "#00")
    .style('font-family', 'sans-serif').style("display", function(d) {
      return (d == 'root') ? 'none' : 'initial';
    });
}
