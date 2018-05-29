// Pie Chart Parteien 2012&2016
function drawPiechartParteien2012_2016() {
     
      canvas.selectAll('path').remove();
            
            //Farbskala Pie Chart
			var colorpie = d3.scaleOrdinal()
				.range(["#6a51a3", "#08306b", "green", "red", "orange", "#2171b5", "#67000d", "#c7e9c0", "#ffff00"])
           
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
            if(i<4){
                horz = (i * legendRectSize*5.4)-155; // -2 * legendRectSize;
                vert = 205;// i * height - offset;
            }else{
                horz = ((i-4) * legendRectSize*5.4)-155;
                vert = height +215;      
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


// Pie Chart Parteien 2008
function drawPiechartParteien2008() {
     
            //Farbskala Pie Chart
			var colorpie = d3.scaleOrdinal()
				.range(["#6a51a3", "#08306b", "green", "red", "orange", "#2171b5", "#67000d", "#c7e9c0", "#ffff00"])
     
      canvas.selectAll('path').remove();
    
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
                    piedata.push({party: 'ALGP', votes: d.ALGP})
            })
   
            var arc = d3.arc()
				.innerRadius(80) //if inner radius is 0 then it becomes a pie chart
				.outerRadius(r);
				
			var pie = d3.pie()
				.value(function (d) {return d.votes;});
            
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
            if(i<4){
                horz = (i * legendRectSize*5.4)-155; // -2 * legendRectSize;
                vert = 215;// i * height - offset;
            }else{
                horz = ((i-4) * legendRectSize*5.4)-155;
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




//Pie Chart Auslaender 2015-2017
function drawPiechartAuslaender() {
     
            //Farbskala Pie Chart
			var colorpie = d3.scaleOrdinal()
				.range(["#ff0000", "#0059b2"])
     
      canvas.selectAll('path').remove();
    
            var filteredAusland = csvAusland.filter(function(d) {
                return d.Jahr === "2017";
                });
           
            var piefilteredData = filteredAusland.filter(function(d) {
                return d.BFS_NR_GEMEINDE === "4566";
                }); 
    
            var piedata = []
                piefilteredData.forEach(function(d) {
                    piedata.push({Herkunft: 'Schweiz', Anzahl: d.Schweiz})
                    piedata.push({Herkunft: 'Ausland', Anzahl: d.Ausland})
            })
     
    
            var arc = d3.arc()
				.innerRadius(80) //if inner radius is 0 then it becomes a pie chart
				.outerRadius(r);
				
			var pie = d3.pie()
				.value(function (d) {return d.Anzahl;});
            
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
                            .html("<strong>" + "Herkunft: " + "</strong>" + piedata.Herkunft + "<br/>" + "<strong>" + "Anteil: " + "</strong>" + piedata.Anzahl + "%")
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
    
       // .attr('transform', 'translate(20, 215)');
        
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



//Pie Chart Haushaltstyp
function drawPiechartHaushalt() {
     
            //Farbskala Pie Chart
			var colorpie = d3.scaleOrdinal()
				.range(["#ff0000", "#0059b2", "#6a51a3", "green", "orange"])
     
      canvas.selectAll('path').remove();
    
            var piefilteredData = csvHaushalt.filter(function(d) {
                return d.BFS_NR_GEMEINDE === "4566";
                }); 
    
    
            var piedata = []
                piefilteredData.forEach(function(d) {
                    piedata.push({Haushalt: 'Einpersonenhaushalte', Anzahl: d.Einpersonenhaushalte})
                    piedata.push({Haushalt: 'Paare ohne Kinder', Anzahl: d.Paare_ohne_Kinder})
                    piedata.push({Haushalt: 'Paare mit Kinder', Anzahl: d.Paare_mit_Kinder})
                    piedata.push({Haushalt: 'Einelternhaushalte', Anzahl: d.Einelternhaushalte})
                    piedata.push({Haushalt: 'Andere Haushalte', Anzahl: d.Andere_Haushalte})
            })

            var arc = d3.arc()
				.innerRadius(80) //if inner radius is 0 then it becomes a pie chart
				.outerRadius(r);
				
			var pie = d3.pie()
				.value(function (d) {return d.Anzahl;});
            
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
                            .html("<strong>" + "Haushaltstyp: " + "</strong>" + piedata.Herkunft + "<br/>" + "<strong>" + "Anteil: " + "</strong>" + piedata.Anzahl + "%")
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
                horz = (i * legendRectSize*5.4)-155; // -2 * legendRectSize;
                vert = 205;// i * height - offset;
            }else{
                horz = ((i-4) * legendRectSize*5.4)-155;
                vert = height +215;      
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
    
    //}



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




// Pie Chart Konfession 2015-2017
function drawPiechartKonfession() {
     
            //Farbskala Pie Chart
			var colorpie = d3.scaleOrdinal()
				.range(["green", "#ff0000", "#0059b2"])
     
      canvas.selectAll('path').remove();
    
            var filteredKonfession = csvKonfession.filter(function(d) {
                return d.JAHR === "2017";
                }); 
    
            var piedata = filteredKonfession.filter(function(d) {
                return d.BFS_NR_GEMEINDE === "4421";
                }); 

            var arc = d3.arc()
				.innerRadius(80) //if inner radius is 0 then it becomes a pie chart
				.outerRadius(r);
				
			var pie = d3.pie()
				.value(function (d) {return d.ANZAHL_PERSONEN;});
            
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
                            .html("<strong>" + "Konfession: " + "</strong>" + piedata.KONFESSION_BEZEICHNUNG + "<br/>" + "<strong>" + "Anteil: " + "</strong>" + piedata.ANZAHL_PERSONEN + "%")
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




// Pie Chart Altersgruppen 2004-2017
function drawPiechartAlter() {
     
            //Farbskala Pie Chart
			var colorpie = d3.scaleOrdinal()
				.range(["#ff0000", "#0059b2", "#6a51a3", "green", "orange"])
     
      canvas.selectAll('path').remove();
    
            var filteredAlter = csvAlter.filter(function(d) {
                return d.Statistikjahr === "2017";
                }); 
    
            var piefilteredData = filteredAlter.filter(function(d) {
                return d.BFS_NR_GEMEINDE === "4421";
                }); 
    
            var piedata = []
                piefilteredData.forEach(function(d) {
                    piedata.push({Altersgruppe: '0-19', Anteil: d["0-19"]})
                    piedata.push({Altersgruppe: '20-39', Anteil: d["20-39"]})
                    piedata.push({Altersgruppe: '40-64', Anteil: d["40-64"]})
                    piedata.push({Altersgruppe: '65-79', Anteil: d["65-79"]})
                    piedata.push({Altersgruppe: '80+', Anteil: d["80+"]})
                   
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
                            .html("<strong>" + "Altersgruppe: " + "</strong>" + piedata.Altersgruppe + "<br/>" + "<strong>" + "Anteil: " + "</strong>" + piedata.Anteil + "%")
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
                horz = (i * legendRectSize*5.4)-155; // -2 * legendRectSize;
                vert = 215;// i * height - offset;
            }else{
                horz = ((i-4) * legendRectSize*5.4)-155;
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