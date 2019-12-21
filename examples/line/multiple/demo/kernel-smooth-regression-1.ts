import { Chart } from '@antv/g2';

function getStaticsData(data) {
  const result = [
    'boxcar',
    'cosine',
    'epanechnikov',
    'gaussian',
    'quartic',
    'triangular',
    'tricube',
    'triweight',
    'uniform',
  ].map((method, i) => {
    const dv = new DataSet.View().source(data);
    dv.transform({
      type: 'kernel-smooth.regression',
      as: ['x', method],
      method,
      field: 'depth',
      extent: [50, 70],
    });

    return dv.rows;
  });

  return _.zipWith(...result, (...args) => {
    return _.assign({}, ...args);
  });
}

fetch('../data/diamond.json')
  .then((res) => res.json())
  .then((data) => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
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

    const statics = getStaticsData(data);

    chart.data(statics);

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
      i && chart.axis(method, false);
      chart.tooltip({
        showCrosshairs: true,
      });
      chart
        .line()
        .position(`x*${method}`)
        .color(chart.getTheme().colors[i]);
    });

    chart.render();
  });
