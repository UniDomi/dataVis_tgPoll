function selectIndikator(selection) {
  indikator = selection;
  var title = "Indikator";
  switch (selection) {
    case 1:
      title = "Parteistärke";
      break;
    case 2:
      title = "Haushaltstyp";
      break;
    case 3:
      title = "Altersstruktur";
      break;
    case 4:
      title = "Ausländeranteil";
      console.log(title);
      break;
    default:
  }
  d3.select("#indikatorTitle").html("<h4>" + title + "</h4>")
  console.log(title);
  console.log(indikator);
}
