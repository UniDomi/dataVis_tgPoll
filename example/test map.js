
    var dataset;


	var widthT = 960,
		height = 500;

    d3.select("#year").on("change", function(d){
    var selectedIndex = d3.select(this).property('selectedIndex');
    var dataCSV;
    switch (selectedIndex){
        case 1:
            dataCSV="/data/gemeinden/1.csv";
            break;
        case 2:
            dataCSV="Gemeinden_2011.csv";
            break;
        case 3:
            dataCSV="Gemeinden_2010.csv";
            break;

        default:
            dataCSV="Gemeinden_2013.csv";
            break;

    }

    loadDataSet(dataCSV);
});

	var svg = d3.select("#map").append("g").append("svg")
		.attr("widthT", widthT)
		.attr("height", height);

    var div = d3.select("body").append("div")
        .attr("class","tooltip")
        .style("opacity",0);

    //map colour scale
    var mapColour = d3.scaleThreshold()
        .domain([0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.51, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85])
        .range(['#4c0000', '#99000d', '#cb181d', '#ef3b2c', '#fb6a4a', '#fc9272', '#fcbba1', '#fee5d9', '#edf8e9','#c7e9c0','#a1d99b','#74c476','#41ab5d','#238b45','#005a32', '#002600']);

    //load data files
	d3.queue()
		.defer(d3.json, "map-TG.json")
		.defer(d3.csv, "data/gemeinden/10.csv")
        .defer(d3.csv, "Parteien_2016.csv")
		.await(ready)

function ready (error, data, csvAbstimmung, csvParteien){

	if(error){console.log("Error: "+ error)};

    dataset = data;
	
    csvParteien.forEach(function(d) {
                    d.EDU = +d.EDU;
                   d.EVP = +d.EVP;
                   d.GP = +d.GP;
                   d.SP = +d.SP;
                   d.CVP = +d.CVP;
                   d.FDP = +d.FDP;
                   d.SVP = +d.SVP;
                   d.glp = +d.glp;
                   d.BDP = +d.BDP;
               });

    //legend
    function drawLegend(scale){
        d3.select('#legend').selectAll('ul').remove();

    var legend = d3.select('#legend')
        .append('ul')
        .attr('class', 'list-inline');

    var keys = legend.selectAll('li.key')
        .data(scale.range());

    keys.enter().append('li')
        .attr('class', 'key')
        .style('border-top-color', String)
        .text(function(d) {
            var r = scale.invertExtent(d);
            return Math.round(r[0]*1000)/10+'%';
    });
}

	var Gemeinden = topojson.feature(data, data.objects.municipalities).features;

	//match id (topojson) & BFS_NR_GEMEINDE (csvAbstimmung)
	Gemeinden.forEach(function(gemeinde){
	csvAbstimmung.some(function(csvrow){
		if (gemeinde.id == csvrow.BFS_NR_GEMEINDE) {
            gemeinde.properties.data=csvrow;
			return true;
            }
		});
	});

    //match id (topojson) & BFS_NR_GEMEINDE (csvParteien)
    Gemeinden.forEach(function(gemeinde){
	csvParteien.some(function(csvrow){
		if (gemeinde.id == csvrow.BFS_NR_GEMEINDE) {
            gemeinde.properties.data2=csvrow;
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
		.attr("id",function(d){return d.id})
		//.property("data",function(d){return d.properties.data})
        .style("fill", function (d) {
            if(d.properties.data){
                var percentage =parseInt(d.properties.data.JA_STIMMEN)/ parseInt(d.properties.data.GUELTIGE_STIMMEN);
                /*console.log(percentage)*/; return mapColour((percentage)); //Ja-Stimmen in Prozent
            }else if (d.id == "9329"){return "#2299ee"} //if lake fill blue
        })

        .on("mouseover", function(d) {
             d3.select(this)
                .style('stroke', function (d) {
                    return '#a0a0a0';
                })
                .style('stroke-widthT', function (d) {
                    return '1';
                });

            div.transition()
                .duration(200)
                .style("opacity", .9);
            div
                .html("<strong>" + d.properties.data.GEMEINDE_NAME + "</strong>"+ "<br/>" + "Ja-Stimmen: " + Math.round (parseInt(d.properties.data.JA_STIMMEN)/ parseInt(d.properties.data.GUELTIGE_STIMMEN) * 100) *100 / 100  + "%" + "<br/>" + "Stimmbeteiligung: " + d.properties.data.STIMMBETEILIGUNG + "%" + "<br/>" + "Anteil SVP: " + parseInt(d.properties.data2.SVP) + "%")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            })

        .on("mouseout", function(d) {
            d3.select(this)
                .style('stroke', '#000')
                .style('stroke-widthT', '0.5');
            div.transition()
                .duration(500)
                .style("opacity", 0);
        })
	
	.on("click",function(d){  //function(e,f){
            
                d3.select('#piechart').select('h4').html(d.properties.data.GEMEINDE_NAME);
                d3.select('#piechart').select('h4').attr("BFS-Nr",d.id);
        
                //drawPiechart();
           })

		.attr("d", path);
	
	
     var width2 = 360;
    var height2 = 480;
    var r = Math.min(width2, height2) / 2; //var r = 180;
	
    	//Farbskala
	var colorpie = d3.scaleOrdinal()
		.range(["#6a51a3", "#08306b", "green", "red", "orange", "#2171b5", "#67000d", "#c7e9c0", "#ffff00"])
            
        // d3.select('#piechart').selectAll('svg').remove();
            
            
       //function drawPiechart() {
          
            var piefilteredData = csvParteien.filter(function(d) {
                return d.BFS_NR_GEMEINDE === "4551";
                });
    
            var piedata = []
                piefilteredData.forEach(function(d) {
                  piedata.push({party: 'EDU', votes: d.EDU})
                    piedata.push({party: 'EVP', votes: d.EVP})
                    piedata.push({party: 'GP', votes: d.GP})
                    piedata.push({party: 'SP', votes: d.SP})
                    piedata.push({party: 'CVP', votes: d.CVP})
                    piedata.push({party: 'FDP', votes: d.FDP})
                    piedata.push({party: 'SVP', votes: d.SVP})
                    piedata.push({party: 'glp', votes: d.glp})
                    piedata.push({party: 'BDP', votes: d.BDP})
            })
    
            var arc = d3.arc()
		.innerRadius(80) //if inner radius is 0 then it becomes a pie chart
		.outerRadius(r);
				
		var pie = d3.pie()
			.value(function (d) {return d.votes;});
            
            
            var canvas = d3.select("#piechart").append("svg")
                .attr("width", width2)
                .attr("height", height2)
                .append("g")
                .attr("transform", "translate(" + width2 / 2 + "," + 200 + ")")
            
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
                            .html("<strong>" + "Partei: " + "</strong>" + piedata.party + "<br/>" + "<strong>" + "Anteil: " + "</strong>" + piedata.votes + "%")
                            .style("left", (d3.event.pageX) + "px")
                            .style("top", (d3.event.pageY - 28) + "px");
                    })
                
                .attr("fill", function (d) {return colorpie (d.value);}); 
       //}
	
	
};
