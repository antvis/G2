import { Chart } from '@antv/g2';

fetch('../data/diamond.json')
  .then((res) => res.json())
  .then((data) => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
    });

    chart.data(data);
    chart.scale({
      carat: {
        alias: '克拉数',
        min: 0,
        max: 4,
        sync: true,
      },
      price: {
        alias: '价格',
        sync: true,
      },
    });
    chart.point().position('carat*price');

    [
      'boxcar',
      'cosine',
      'epanechnikov',
      'gaussian',
      'quartic',
      'triangular',
      'tricube',
      'triweight',
      'uniform',
    ].forEach((method, i) => {
      const dv = new DataSet.View().source(data);
      dv.transform({
        type: 'kernel-smooth.regression',
        method,
        fields: ['carat', 'price'],
        as: ['carat', 'price'],
        bandwidth: 0.5,
        extent: [0, 4],
      });

      const view = chart.createView();
      view.axis(false);
      view.data(dv.rows);
      view
        .line()
        .position('carat*price')
        .color(view.getTheme().colors[i]);
    });

    chart.render();
  });
