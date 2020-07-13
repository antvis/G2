import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';
import * as _ from 'lodash';

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
  ].map((method) => {
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

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json')
  .then((res) => res.json())
  .then((data) => {
    const statics = getStaticsData(data);

    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
    });

    chart.data(statics);

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
      if (i) {
        chart.axis(method, false);
      }
      chart.tooltip({
        showCrosshairs: true,
        shared: true,
      });
      chart
        .line()
        .position(`x*${method}`)
        .color(chart.getTheme().colors20[i]);
    });

    chart.render();
  });
