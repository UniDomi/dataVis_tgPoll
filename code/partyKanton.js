function createKantPie() {

  d3.csv("data/Parteistaerken_an_Grossratswahlen.csv", function(error,data){drawKantPie(data)})

  function drawKantPie(data){
    console.log(data);
    delete data.Wahljahr;
    var pieChart = d3.pie();
    var yourPie = pieChart([1, 1, 2]);

    console.log(kantPie);

    var piedata = [];
    for (var key in data) {
      piedata.push({
        party: key,
        votes: data[key]
      })
    };
    var kantPie = pieChart(piedata);
    var newArc = d3.arc();
    newArc.innerRadius(0)
      .outerRadius(100)
    console.log(newArc(piedata[0]));

    var fillScale = d3.scaleOrdinal()
      .range(["#fcd88a", "#cf7c1c", "#93c464", "#75734F"])
    d3.selectAll("#piechart")
      //.append("svg")
      //.attr("width", "500")
      //.attr("height", "500")
      .select("svg")
      .append("g")
      .attr("transform", "translate(250,250)")
      .selectAll("path")
      .data(kantPie)
      .enter()
      .append("path")
      .attr("d", newArc)
      .style("fill", (d, i) => fillScale(i))
      .style("stroke", "black")
      .style("stroke-width", "2px");
  }
}
