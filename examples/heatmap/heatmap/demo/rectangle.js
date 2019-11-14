fetch('../data/gaussion-distribution.json')
  .then(res => res.json())
  .then(data => {
    const ds = new DataSet({
      state: {
        sizeEncoding: false
      }
    });
    const dv = ds.createView('diamond').source(data);
    dv.transform({
      sizeByCount: '$state.sizeEncoding', // calculate bin size by binning count
      type: 'bin.rectangle',
      fields: [ 'x', 'y' ], // 对应坐标轴上的一个点
      bins: [ 20, 10 ]
    });

    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500
    });
    chart.source(dv);
    chart.legend({
      offset: 40
    });
    chart.tooltip(false);
    chart.polygon()
      .position('x*y')
      .color('count', '#BAE7FF-#1890FF-#0050B3');
    chart.render();
  });
