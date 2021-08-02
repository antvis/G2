import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('#2425', () => {
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
      width: 786,
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

    const path = chart.path().position('date*value').shape('smooth').size(3);
    chart.render();

    expect(path.elements[0].shape.attr('path')).toEqual([
      ['M', 43.16567138671875, 24.87783683999993],
      ['C', 43.16567138671875, 24.87783683999993, 335.8728461548869, 24.87783683999993, 338.2214233086437, 78.8942796],
      ['C', 341.00935167326026, 143.01564460834066, 339.0856122621891, 434.95660002, 341.00935167326026, 434.95660002],
      ['C', 341.594747790344, 434.95660002, 341.00935167326026, 345.49685332944074, 344.4942621290311, 326.65916088],
      [
        'C',
        358.84001850844055,
        249.11313780144064,
        770.3503198242188,
        193.99731119999996,
        770.3503198242188,
        193.99731119999996,
      ],
    ]);
  });
});
