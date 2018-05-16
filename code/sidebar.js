function createSidebar(){
  d3.csv("data/Eidg_Abstimmungen_2000_2017_Kanton_inkl_Themen.csv", data =>
  {createThemeBlocks(data)})

  function createThemeBlocks(data){
    d3.select("svg")
      .append("g")
      .attr("id", "pollsG")
      .attr("transform", "translate(50,300)")
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "overallG")
      .attr("transform", (d, i) => "translate(0, "+ (i* 50) + " ) ")

    var pollsG = d3.selectAll("g.overallG");
    pollsG
      .append("circle")
      .attr("r", 20)
    pollsG
      .append("text")
      .attr("x",1000)
      .text( d => d.VORLAGE_BEZEICHNUNG)

    const dataKeys = Object.keys(data[0])
    .filter(d => d !== "VORLAGE_BEZEICHNUNG" && d !=="D1E1_CODE")
    d3.select("#controls").selectAll("button.teams")
    .data(dataKeys).enter()
    .append("button")
    .on("click", buttonClick)
    .html(d => d);

    pollsG.on("mouseover", highlightRegion);

    function highlightRegion(d) {
      d3.selectAll("g.overallG").select("circle")
    .attr("class", p => p.D1E1_CODE === d.D1E1_CODE ? "active" : "inactive")
    }

    pollsG.on("mouseout", function(){
      d3.selectAll("g.overallG")
        .select("circle")
        .classed("inactice", false).classed("active", false)
    })

    function buttonClick(datapoint) {
    var maxValue = d3.max(data, d => parseFloat(d[datapoint]))
    var radiusScale = d3.scaleLinear()
    .domain([ 0, maxValue ]).range([ 2, 20 ])
    d3.selectAll("g.overallG").select("circle")
    .attr("r", d => radiusScale(d[datapoint]))
    }
  }


}
