createSidebar();

poll = 2;

function createSidebar(){
  d3.csv("data/Eidg_Abstimmungen_2000_2017_Kanton_inkl_Themen.csv", data =>
  {createThemeBlocks(data)})

  function createThemeBlocks(data){
    d3.select("#tree")
      .append("g")
      .attr("id", "pollsG")
      .attr("transform", "translate(30,30)")
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "overallG")
      .attr("transform", (d, i) => "translate(0, "+ (i* 30) + " ) ")

    var pollsG = d3.selectAll("g.overallG");
    pollsG
      .append("circle")
      .attr("r", 5)
    pollsG
      .append("text")
      .attr("x",250)
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

    pollsG.on("click", function(d){
      //d3.select("#map").select("svg").destroy();
      d3.selectAll("#map").select("svg").remove()
      poll = d.VORLAGE_NR;
      drawMap();
      console.log(poll)
      w3_close()
    });

    function buttonClick(datapoint) {
    var maxValue = d3.max(data, d => parseFloat(d[datapoint]))
    var radiusScale = d3.scaleLinear()
    .domain([ 0, maxValue ]).range([ 2, 20 ])
    d3.selectAll("g.overallG").select("circle")
    .attr("r", d => radiusScale(d[datapoint]))
    }
  }


}
