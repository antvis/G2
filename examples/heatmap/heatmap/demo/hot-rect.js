fetch('../data/diamond.json')
  .then(res => res.json())
  .then(data => {
    const { DataView } = DataSet;
    const dv = new DataView();
    dv.source(data)
      .transform({
        type: 'bin.rectangle',
        fields: [ 'carat', 'price' ]
      });
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500,
      padding: [ 20, 80, 120, 85 ]
    });
    chart.source(dv);
    chart.tooltip({
      showTitle: false
    });
    chart.polygon()
      .position('x*y')
      .color('count', [ '#BAE7FF', '#1890FF', '#0050B3' ]);
    chart.render();
  });
