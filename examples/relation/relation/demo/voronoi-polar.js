fetch('../data/voronoi.json')
  .then(res => res.json())
  .then(data => {
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'diagram.voronoi',
      fields: [ 'x', 'y' ],
      size: [ 800, 600 ],
      as: [ '_x', '_y' ]
    });

    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500,
      padding: 0
    });
    chart.axis(false);
    chart.legend(false);
    chart.coord('polar');
    chart.tooltip({
      showTitle: false
    });

    chart.source(dv);
    chart.polygon()
      .position('_x*_y')
      .color('value')
      .label('value', {
        offset: 0,
        textStyle: {
          fill: '#fff',
          fontSize: '12',
          textAlign: 'center',
          shadowBlur: 2,
          shadowColor: 'rgba(0, 0, 0, .45)'
        }
      });

    chart.render();
  });
