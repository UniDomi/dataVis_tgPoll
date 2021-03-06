createSidebar();

poll = 1;
datum = 2000;
indikator = 1;
indikatorpath = "Parteien_2016.csv"
bezeichnung = 'Bundesbeschluss über die Reform der Justiz'

function createSidebar() {
  d3.csv("data/Eidg_Abstimmungen_2000_2017_Kanton_inkl_Themen.csv", data => {
    createD1E1(data);
  })

  function drawBlocks(blockId) {
    var mapColour = d3.scaleThreshold()
      .domain([0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.51, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 1])
      .range(['#4c0000', '#99000d', '#cb181d', '#ef3b2c', '#fb6a4a', '#fc9272', '#fcbba1', '#fee5d9', "#cce5ff", '#99ccff', '#66b2ff', '#3299ff', '#0080ff', '#0066cc', '#004c99', '#003366', "#00264c"]);

    var block = d3.selectAll("g." + blockId);
    block
      .append("rect")
      .attr("width", 230)
      .attr("height", 40)
      .attr("fill", function(d) {
        if (d.value) {
          var percentage = d.value/100;
          /*console.log(percentage)*/
          ;
          return mapColour((percentage)); //Ja-Stimmen in Prozent
        } else if (d.id == "9329") {
          return "white"//"#2299ee"
        } //if lake fill white/blue
      })
      .attr("border", "solid black 1px")

    block
      .append("text")
      .style("text-anchor", "start")
      .attr("x", 7)
      .attr("y", 25)

      .text(d => d.key)
      .style("font-size", "15px")
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
    var mapColour = d3.scaleThreshold()
      .domain([0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.51, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 1])
      .range(['#4c0000', '#99000d', '#cb181d', '#ef3b2c', '#fb6a4a', '#fc9272', '#fcbba1', '#fee5d9', "#cce5ff", '#99ccff', '#66b2ff', '#3299ff', '#0080ff', '#0066cc', '#004c99', '#003366', "#00264c"]);

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
        if (d.JA_STIMMEN_PROZENT) {
          var percentage = d.JA_STIMMEN_PROZENT/100;
          /*console.log(percentage)*/
          ;
          return mapColour((percentage)); //Ja-Stimmen in Prozent
        } else if (d.id == "9329") {
          return "white"//"#2299ee"
        } //if lake fill white/blue
      })
      .attr("border", "solid black 1px")
      .attr("border", "solid black 1px")
    pollsG
      .append("text")
      .style("text-anchor", "start")
      .attr("x", 7)
      .attr("y", 25)
      .attr("content-area", "10px, 10px")
      .text(d => d.VORLAGE_BEZEICHNUNG+" "+d.DATUM_ABSTIMMUNG)
      .style("font-size", "15px")
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

      poll = d.VORLAGE_NR;
      datum = d.DATUM_ABSTIMMUNG.substring(6);
      bezeichnung = d.VORLAGE_BEZEICHNUNG;
      drawMap();
      console.log("Poll & Indikator")
      console.log(poll)
      console.log(indikatorpath)
      console.log(indikator)
      console.log(datum)
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
