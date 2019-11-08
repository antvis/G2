fetch('../data/diamond.json')
  .then(res => res.json())
  .then(data => {
    const ds = new DataSet();
    const dv = ds.createView('diamond').source(data);
    dv.transform({
      type: 'bin.histogram',
      field: 'depth',
      binWidth: 4, // 在此修改矩形的宽度，代表真实数值的大小
      as: [ 'depth', 'count' ]
    });

    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500
    });
    chart.source(dv, {
      depth: {
        tickInterval: 4
      }
    });
    chart.tooltip({
      crosshairs: false,
      position: 'top',
      inPlot: false
    });
    chart.interval().position('depth*count');
    chart.render();

  });
