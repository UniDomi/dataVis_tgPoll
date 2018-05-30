function cleanup(){
  d3.selectAll("#map").select("svg").remove()
  d3.selectAll(".legend").remove()
  d3.selectAll("#piechart").selectAll(".arcs").remove()
  d3.selectAll("#piechart").select("g").remove()
  d3.selectAll("#piechart").selectAll("#pie").remove()
}

function w3_open() {
    document.getElementById("mySidebar").style.width = "100%";
    document.getElementById("mySidebar").style.display = "block";

}
function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
}
