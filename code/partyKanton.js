function createPie() {
  var pieChart = d3.pie();
  var yourPie = pieChart([1, 1, 2]);

  var newArc = d3.arc();
  newArc.innerRadius(0)
    .outerRadius(100)
  console.log(newArc(yourPie[0]));

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
    .data(yourPie)
    .enter()
    .append("path")
    .attr("d", newArc)
    .style("fill", (d, i) => fillScale(i))
    .style("stroke", "black")
    .style("stroke-width", "2px");
}
