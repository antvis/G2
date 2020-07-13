import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';

const COLOR_PLATE_20 = [
  '#5B8FF9',
  '#BDD2FD',
  '#5AD8A6',
  '#BDEFDB',
  '#5D7092',
  '#C2C8D5',
  '#F6BD16',
  '#FBE5A2',
  '#E8684A',
  '#F6C3B7',
  '#6DC8EC',
  '#B6E3F5',
  '#9270CA',
  '#D3C6EA',
  '#FF9D4D',
  '#FFD8B8',
  '#269A99',
  '#AAD8D8',
  '#FF99C3',
  '#FFD6E7',
];

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json')
  .then(res => res.json())
  .then(data => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
      padding: 50
    });

    chart.scale({
      carat: {
        sync: true,
        nice: true,
      },
      price: {
        sync: true,
        nice: true,
      }
    });

    // background
    const pointsView = chart.createView();
    pointsView.data(data);
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
          fields: ['carat', 'price'],
          bandwidth: 0.1,
          extent: [0, 4],
          as: ['carat', 'price']
        });
      const view = chart.createView();
      view.axis(false);
      view.data(dv.rows);
      view.line()
        .position('carat*price')
        .size(1)
        .color(COLOR_PLATE_20[i]);
    });

    chart.render();
  });

