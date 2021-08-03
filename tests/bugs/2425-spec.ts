import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('#2425', () => {
  test('smooth line should not overlap for extreme situation', () => {
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

  test('smooth line should draw the correctly extreme value', () => {
    const data = [
      {
        date: 1587631980000,
        value: 10,
      },
      {
        date: 1587708180000,
        value: 20,
      },
      {
        date: 1587708900000,
        value: 45,
      },

      {
        date: 1587789800000,
        value: 45,
      },
      {
        date: 1587819780000,
        value: 10,
      },
    ];
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
      ['M', 36.6271142578125, 385.2],
      ['C', 36.6271142578125, 385.2, 330.57491054252716, 365.863588147504, 334.28174759447387, 290.4],
      [
        'C',
        337.09423231891475,
        233.14358814750403,
        334.28174759447387,
        53.39999999999998,
        337.09423231891475,
        53.39999999999998,
      ],
      [
        'C',
        340.8441129739034,
        53.39999999999998,
        571.1329597311636,
        53.39999999999998,
        653.1081409401208,
        53.39999999999998,
      ],
      ['C', 744.3820187567227, 53.39999999999998, 770.2168798828125, 385.2, 770.2168798828125, 385.2],
    ]);
  });
});
