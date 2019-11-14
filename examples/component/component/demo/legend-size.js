
fetch('../data/world.geo.json')
  .then(res => res.json())
  .then(data => {
    const ds = new DataSet();
    const dv = ds.createView('back')
      .source(data, {
        type: 'GeoJSON'
      });
    const userData = [
      { name: 'Russia', value: 86.8 },
      { name: 'China', value: 106.3 },
      { name: 'Japan', value: 94.7 },
      { name: 'Mongolia', value: 98 },
      { name: 'Canada', value: 98.4 },
      { name: 'United Kingdom', value: 97.2 },
      { name: 'United States of America', value: 98.3 },
      { name: 'Brazil', value: 96.7 },
      { name: 'Argentina', value: 95.8 },
      { name: 'Algeria', valsue: 101.3 },
      { name: 'France', value: 94.8 },
      { name: 'Germany', value: 96.6 },
      { name: 'Ukraine', value: 86.3 },
      { name: 'Egypt', value: 102.1 },
      { name: 'South Africa', value: 101.3 },
      { name: 'India', value: 107.6 },
      { name: 'Australia', value: 99.9 },
      { name: 'Saudi Arabia', value: 130.1 },
      { name: 'Afghanistan', value: 106.5 },
      { name: 'Kazakhstan', value: 93.4 },
      { name: 'Indonesia', value: 101.4 }
    ];
    const userDv = ds.createView()
      .source(userData)
      .transform({
        geoDataView: dv,
        field: 'name',
        type: 'geo.centroid',
        as: [ 'longitude', 'latitude' ]
      });
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500,
      padding: 'auto'
    });
    chart.scale({
      longitude: {
        sync: true
      },
      latitude: {
        sync: true
      }
    });
    chart.axis(false);
    chart.legend({
      name: false,
      reactive: true,
      sizeType: 'circle'
    });
    /* chart.legend({ position: 'right-center' });*/
    chart.tooltip({
      showTitle: false
    });
    const bgView = chart.view();
    bgView.source(dv);
    bgView.tooltip(false);
    bgView.polygon().position('longitude*latitude')
      .color('#ebedf0')
      .style({
        lineWidth: 1,
        stroke: '#fafbfc'
      })
      .active(false);
    const userView = chart.view();
    userView.source(userDv);
    userView.point().position('longitude*latitude')
      .color('#1890ff')
      .opacity(0.6)
      .size('value', [ 5, 15 ])
      .style({
        lineWidth: 1,
        stroke: '#1890ff'
      })
      .shape('circle');
    chart.render();
  });
