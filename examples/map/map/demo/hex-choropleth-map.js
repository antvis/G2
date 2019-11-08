function addPoint(collection, point, count = 1) {
  for (let i = 0; i < count; i++) {
    collection.push(point);
  }
}
function getCount(x, y, medianX, medianY) {
  const distance = Math.pow((x - medianX), 2) + Math.pow((y - medianY), 2);
  if (distance < 4) {
    return 3;
  } else if (distance < 16) {
    return 3;
  } else if (distance < 64) {
    return 2;
  }
  return 1;
}
fetch('../data/china-provinces.geo.json')
  .then(res => res.json())
  .then(GeoJSON => {
    const geoDv = new DataSet.View().source(GeoJSON, {
      type: 'GeoJSON'
    });
    // console.log(GeoJSON);
    const ranges = {
      lat: geoDv.range('latitude'),
      lon: geoDv.range('longitude')
    };
    const medians = {
      lat: geoDv.median('latitude'),
      lon: geoDv.median('longitude')
    };

    // console.log(ranges, medians);
    const userData = [];
    for (let lon = ranges.lon[0]; lon <= ranges.lon[1]; lon += 0.5) {
      for (let lat = ranges.lat[0]; lat <= ranges.lat[1]; lat += 0.5) {
        if (geoDv.geoContains(GeoJSON, [ lon, lat ])) {
          addPoint(userData, {
            latitude: lat,
            longitude: lon
          }, getCount(lon, lat, medians.lon, medians.lat));
        }
      }
    }
    // console.log(userData);
    const userDv = new DataSet.View().source(userData).transform({
      // sizeByCount: true,
      type: 'bin.hexagon',
      fields: [ 'longitude', 'latitude' ],
      binWidth: [ 2, 3 ],
      as: [ 'longitude', 'latitude', 'count' ]
    });
    // console.log(userDv);

    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500,
      padding: 0
    });
    chart.scale({
      latitude: { sync: true, nice: false },
      longitude: { sync: true, nice: false }
    });
    chart.legend(false);
    chart.axis(false);
    chart.tooltip(false);

    const geoView = chart.view();
    geoView.source(geoDv);
    geoView.polygon()
      .position('longitude*latitude')
      .color('grey')
      .opacity(0.3);

    const userView = chart.view();
    userView.source(userDv);
    userView.polygon()
      .position('longitude*latitude')
      .color('count', '#BAE7FF-#1890FF-#0050B3')
      .style({
        lineWidth: 10,
        stroke: 'white'
      });
    chart.render();
  });
