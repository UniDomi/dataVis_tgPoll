function selectIndikator(selection) {
  indikator = selection;
  var title = "Indikator";
  switch (selection) {
    case 1:
      title = "Parteistärke";
      indikatorpath = "Parteien_2016.csv"
      drawMap();
      break;
    case 2:
      title = "Haushaltstyp";
      indikatorpath = "Haushaltstyp_2010_2012.csv"
      drawMap();
      break;
    case 3:
      title = "Altersstruktur";
      indikatorpath = "Altersstruktur_2004-2017.csv"
      drawMap();
      break;
    case 4:
      title = "Ausländeranteil";
      indikatorpath = "Auslaenderanteil_2015-2017.csv"
      drawMap();
      break;
    default:
  }
  d3.select("#indikatorTitle").html("<h4>" + title + "</h4>")
  d3.select('#piechart').select('h3').html("Kanton Thurgau")
  console.log(title);
  console.log(indikator);
}
