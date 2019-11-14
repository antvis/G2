fetch('../data/usa.geo.json')
  .then(res => res.json())
  .then(GeoJSON => {
    const userData = [];
    const geoDv = new DataSet.View().source(GeoJSON, {
      type: 'GeoJSON'
    }).transform({
      type: 'map',
      callback(row) {
        userData.push({
          longitude: row.centroidX,
          latitude: row.centroidY,
          name: row.name,
          value: Math.random() * (1000 - 1)
        });
        return row;
      }
    });

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
      .label('name', {
        offset: 0
      });

    const userView = chart.view();
    userView.source(userData);
    userView.heatmap()
      .position('longitude*latitude')
      .color('value', '#F51D27-#FA541C-#FF8C12-#FFC838-#FAFFA8-#80FF73-#12CCCC-#1890FF-#6E32C2')
      .size(500 / 20)
      .style({
        blur: 500 / 15
      });
    chart.render();
  });
