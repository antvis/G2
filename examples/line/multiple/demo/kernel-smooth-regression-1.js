import { Chart } from '@antv/g2';

fetch('../data/diamond.json')
  .then((res) => res.json())
  .then((data) => {
    const chart = new Chart({
      container: 'container',
      forceFit: true,
      height: 500,
    });
    chart.scale({
      x: {
        alias: 'depth',
        min: 50,
        max: 70,
        sync: true,
      },
      y: {
        alias: '概率密度分布',
        sync: true,
      },
    });

    // TODO 如何引入 dataset 模块

    // [
    //   'boxcar',
    //   'cosine',
    //   'epanechnikov',
    //   'gaussian',
    //   'quartic',
    //   'triangular',
    //   'tricube',
    //   'triweight',
    //   'uniform'
    // ].forEach((method, i) => {
    //   const dv = new DataSet.View().source(data);
    //   dv.transform({
    //     type: 'kernel-smooth.regression',
    //     method,
    //     field: 'depth',
    //     extent: [ 50, 70 ]
    //   });
    //
    //   const view = chart.view();
    //   !!i && view.axis(false);
    //   view.data(dv.rows);
    //   view.line()
    //     .position('x*y')
    //     .color(G2.Global.colors_16[i]);
    // });

    chart.render();
  });
