import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('#2212', () => {
  const data = [
    {
      date: 1587631980000,
      value: 96.017334,
    },
    {
      date: 1587708180000,
      value: 84.62146,
    },
    {
      date: 1587708900000,
      value: 9.502827,
    },

    {
      date: 1587709800000,
      value: 32.350388,
    },
    {
      date: 1587819780000,
      value: 60.33812,
    },
  ];

  test('smooth line should not overlap for extreme situation', () => {
    const chart = new Chart({
      container: createDiv(),
      autoFit: true,
      height: 500,
    });

    chart.data(data);

    chart.scale({
      date: {
        type: 'time',
        range: [0.02, 0.98],
        mask: 'YY/MM/DD HH:mm:ss',
        tickCount: 8,
      },
      value: {
        min: 0,
        sync: true,
        nice: true,
      },
    });

    chart
      .path()
      .position('date*value')
      .shape('smooth')
      .size(3);

    chart.render();
  });
});
