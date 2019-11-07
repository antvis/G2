fetch('../data/diamond.json')
  .then(res => res.json())
  .then(data => {
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500
    });

    chart.source(data);
    chart.scale({
      carat: {
        alias: '克拉数',
        min: 0,
        max: 4,
        sync: true
      },
      price: {
        alias: '价格',
        sync: true
      }
    });
    chart.point()
      .position('carat*price');

    [
      'boxcar',
      'cosine',
      'epanechnikov',
      'gaussian',
      'quartic',
      'triangular',
      'tricube',
      'triweight',
      'uniform'
    ].forEach((method, i) => {
      const dv = new DataSet.View().source(data);
      dv.transform({
        type: 'kernel-smooth.regression',
        method,
        fields: [ 'carat', 'price' ],
        as: [ 'carat', 'price' ],
        bandwidth: 0.5,
        extent: [ 0, 4 ]
      });

      const view = chart.view();
      view.axis(false);
      view.source(dv);
      view.line()
        .position('carat*price')
        .color(G2.Global.colors_16[i]);
    });

    chart.render();
  });
