createSidebar();

poll = 1;
datum = 2018;
indikator = 1;

function createSidebar() {
  d3.csv("data/Eidg_Abstimmungen_2000_2017_Kanton_inkl_Themen.csv", data => {
    createD1E1(data);
  })

  function drawBlocks(blockId) {
    var block = d3.selectAll("g." + blockId);
    block
      .append("rect")
      .attr("width", 250)
      .attr("height", 40)
      .attr("fill", function(d) {
        return d.value <= 50 ? 'red' : '#0066cc'
      })
      .attr("border", "solid black 1px")

    block
      .append("text")
      .style("text-anchor", "start")
      .attr("x", 0)
      .attr("y", 25)

      .text(d => d.key)
      .style("font-size", "20px")
      .style("font-weight", "bold")
    return block
  }

  function createD1E1(dataf) {
    var j = -1
    let data = d3.nest()
      .key(function(d) {
        return d.D1E1_BEZEICHNUNG;
      })
      .rollup(function(v) {
        return d3.mean(v, function(d) {
          return d.JA_STIMMEN_PROZENT;
        });
      })
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
      .attr("transform", (d, i) => "translate(0, " + (i * 60) + " ) ")

    var d1e1 = drawBlocks("d1E1");

    d1e1.on("click", function(d) {
      d3.selectAll("#d1E2").remove();
      d3.selectAll("#pollsG").remove();
      console.log(d.key)
      createD1E2(dataf, d.key);
    });
  }

  function createD1E2(dataf, d1e1) {
    console.log(d1e1);
    var filteredData = dataf.filter(function(d) {
      if (d["D1E1_BEZEICHNUNG"] == d1e1) return d;
    })
    console.log(filteredData);
    dataf = filteredData;
    var j = -1;
    let data = d3.nest()
      .key(function(d) {
        return d.D1E2_BEZEICHNUNG;
      })
      .rollup(function(v) {
        return d3.mean(v, function(d) {
          return d.JA_STIMMEN_PROZENT;
        });
      })
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
      .attr("transform", (d, i) => "translate(300, " + (i * 60) + " ) ")

    var d1e2 = drawBlocks("d1E2");

    d1e2.on("click", function(d) {
      d3.selectAll("#pollsG").remove();
      console.log(d.key)
      createThemeBlocks(dataf, d.key);
    });
  }

  function createThemeBlocks(dataf, d1e2) {
    console.log(d1e2)
    var data = dataf.filter(function(d) {
      if (d["D1E2_BEZEICHNUNG"] == d1e2) return d;
    })
    console.log(data)
    d3.select("#tree")
      .append("g")
      .attr("id", "pollsG")
      .attr("transform", "translate(30,30)")
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "overallG")
      .attr("transform", (d, i) => "translate(600, " + (i * 60) + " ) ")

    var pollsG = d3.selectAll("g.overallG");
    pollsG
      .append("rect")
      .attr("width", 1500)
      .attr("height", 40)
      .attr("fill", function(d) {
        return d.JA_STIMMEN_PROZENT <= 50 ? 'red' : '#0066cc'
      })
      .attr("border", "solid black 1px")
    pollsG
      .append("text")
      .style("text-anchor", "start")
      .attr("x", 0)
      .attr("y", 25)
      .attr("content-area", "10px, 10px")
      .text(d => d.VORLAGE_BEZEICHNUNG)
      .style("font-size", "20px")
      .style("font-weight", "bold")

    const dataKeys = Object.keys(data[0])
      .filter(d => d !== "VORLAGE_BEZEICHNUNG" && d !== "D1E1_CODE")
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

    pollsG.on("mouseout", function() {
      d3.selectAll("g.overallG")
        .select("circle")
        .classed("inactice", false).classed("active", false)
    })

    pollsG.on("click", function(d) {
      //d3.select("#map").select("svg").destroy();
      d3.selectAll("#map").select("svg").remove()

      poll = d.VORLAGE_NR;
      datum = d.DATUM_ABSTIMMUNG;
      indikator = d.INDIKATOREN;
      drawMap();
      selectIndikator();
      console.log(poll)
      w3_close()
    });

    function buttonClick(datapoint) {
      var maxValue = d3.max(data, d => parseFloat(d[datapoint]))
      var radiusScale = d3.scaleLinear()
        .domain([0, maxValue]).range([2, 20])
      d3.selectAll("g.overallG").select("circle")
        .attr("r", d => radiusScale(d[datapoint]))
    }
  }


}
