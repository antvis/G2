fetch('../data/diamond.json')
  .then(res => res.json())
  .then(data => {
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'bin.histogram',
      field: 'depth',
      binWidth: 1,
      groupBy: [ 'cut' ],
      as: [ 'depth', 'count' ]
    });
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500
    });
    chart.source(dv);
    chart.tooltip({
      crosshairs: false,
      position: 'top'
    });
    chart.intervalStack()
      .position('depth*count')
      .color('cut');
    chart.render();
  });
