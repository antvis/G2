
fetch('../data/diamond.json')
  .then(res => res.json())
  .then(data => {
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500
    });

    chart.scale({
      carat: {
        sync: true
      },
      price: {
        sync: true
      }
    });

    // background
    const pointsView = chart.view();
    pointsView.source(data);
    pointsView.point().position('carat*price');

    const REGRESSION_METHODS = [
      'linear',
      'exponential',
      'logarithmic',
      'power',
      'polynomial'
    ];
    REGRESSION_METHODS.forEach((method, i) => {
      const dv = new DataSet.View().source(data)
        .transform({
          type: 'regression',
          method,
          fields: [ 'carat', 'price' ],
          bandwidth: 0.1,
          extent: [ 0, 4 ],
          as: [ 'carat', 'price' ]
        });
      const view = chart.view();
      view.axis(false);
      view.source(dv);
      view.line()
        .position('carat*price')
        .size(1)
        .color(G2.Global.colors_16[i]);
    });

    chart.render();
  });

