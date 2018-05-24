createSidebar();

poll = 2;

function createSidebar(){
  d3.csv("data/Eidg_Abstimmungen_2000_2017_Kanton_inkl_Themen.csv", data =>{
    createD1E1(data);
  })

  function createD1E1(dataf){
    let csv = dataf
    var j = -1
    let data = d3.nest()
      .key(function(d) { return d.D1E1_BEZEICHNUNG; })
      .entries(dataf);
      console.log(data);
      console.log(data[0].key);
    d3.select("#tree")
      .append("g")
      .attr("id", "d1E1")
      .attr("transform", "translate(30,30)")
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "d1E1")
      .attr("transform", (d, i) => "translate(50, "+ (i* 30) + " ) ")
      .append("text")
      .attr("x", 60)
      .text(function (){
        j++;
        return data[j].key;})
    var d1e1 = d3.selectAll("g.d1E1");
      d1e1
      .append("circle")
      .attr("r", 10)

      d1e1.on("click", function(){
        createD1E2(csv);
      });
  }


  function createD1E2(dataf){
    let csv = dataf;
    var j = -1;
    let data = d3.nest()
      .key(function(d) { return d.D1E2_BEZEICHNUNG; })
      .entries(dataf);
      console.log(data);
      console.log(data[0].key);
    d3.select("#tree")
      .append("g")
      .attr("id", "d1E2")
      .attr("transform", "translate(30,30)")
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "d1E2")
      .attr("transform", (d, i) => "translate(300, "+ (i* 30) + " ) ")
      .append("text")
      .attr("x", 250)
      .text(function (){
        j++;
        return data[j].key;})
    var d1e2 = d3.selectAll("g.d1E2");
    d1e2
      .append("circle")
      .attr("r", 10)
    d1e2.on("click", function(){
      createThemeBlocks(csv);
    });
  }

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
      .attr("transform", (d, i) => "translate(500, "+ (i* 30) + " ) ")

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
