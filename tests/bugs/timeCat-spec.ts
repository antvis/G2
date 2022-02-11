import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('timeCat as groupScale', () => {
  it('timeCat as groupScale cause error render', () => {
    const data = [
      {
        date: '2021-12-04',
        hour: 12,
        hourGmv: 457,
      },
      {
        date: '2021-12-04',
        hour: 11,
        hourGmv: 1325,
      },
      {
        date: '2021-12-04',
        hour: 10,
        hourGmv: 1866,
      },
      {
        date: '2021-12-04',
        hour: 9,
        hourGmv: 1596,
      },
      {
        date: '2021-12-04',
        hour: 8,
        hourGmv: 1313,
      },
      {
        date: '2021-12-04',
        hour: 7,
        hourGmv: 607,
      },
      {
        date: '2021-12-04',
        hour: 6,
        hourGmv: 284,
      },
      {
        date: '2021-12-04',
        hour: 5,
        hourGmv: 153,
      },
      {
        date: '2021-12-04',
        hour: 4,
        hourGmv: 168,
      },
      {
        date: '2021-12-04',
        hour: 3,
        hourGmv: 286,
      },
      {
        date: '2021-12-04',
        hour: 2,
        hourGmv: 652,
      },
      {
        date: '2021-12-04',
        hour: 1,
        hourGmv: 1069,
      },
      {
        date: '2021-12-03',
        hour: 24,
        hourGmv: 1883,
      },
      {
        date: '2021-12-03',
        hour: 23,
        hourGmv: 962,
      },
      {
        date: '2021-12-03',
        hour: 22,
        hourGmv: 162,
      },
      {
        date: '2021-12-03',
        hour: 21,
        hourGmv: 218,
      },
      {
        date: '2021-12-03',
        hour: 20,
        hourGmv: 219,
      },
      {
        date: '2021-12-03',
        hour: 19,
        hourGmv: 583,
      },
      {
        date: '2021-12-03',
        hour: 18,
        hourGmv: 1063,
      },
      {
        date: '2021-12-03',
        hour: 17,
        hourGmv: 2208,
      },
      {
        date: '2021-12-03',
        hour: 16,
        hourGmv: 2884,
      },
      {
        date: '2021-12-03',
        hour: 15,
        hourGmv: 2711,
      },
      {
        date: '2021-12-03',
        hour: 14,
        hourGmv: 2285,
      },
      {
        date: '2021-12-03',
        hour: 13,
        hourGmv: 576,
      },
      {
        date: '2021-12-03',
        hour: 12,
        hourGmv: 2516,
      },
      {
        date: '2021-12-03',
        hour: 11,
        hourGmv: 1726,
      },
      {
        date: '2021-12-03',
        hour: 10,
        hourGmv: 3852,
      },
      {
        date: '2021-12-03',
        hour: 9,
        hourGmv: 2524,
      },
      {
        date: '2021-12-03',
        hour: 8,
        hourGmv: 1195,
      },
      {
        date: '2021-12-03',
        hour: 7,
        hourGmv: 566,
      },
      {
        date: '2021-12-03',
        hour: 6,
        hourGmv: 174,
      },
      {
        date: '2021-12-03',
        hour: 5,
        hourGmv: 161,
      },
      {
        date: '2021-12-03',
        hour: 4,
        hourGmv: 106,
      },
      {
        date: '2021-12-03',
        hour: 3,
        hourGmv: 183,
      },
      {
        date: '2021-12-03',
        hour: 2,
        hourGmv: 412,
      },
      {
        date: '2021-12-03',
        hour: 1,
        hourGmv: 1418,
      },
    ];

    const chart = new Chart({
      container: createDiv(),
      autoFit: true,
      height: 500,
    });

    chart.data(data);

    chart
      .line()
      .position('hour*hourGmv')
      .color('date')
      .shape('smooth');

    chart.render();

    expect(chart.geometries[0].elements.length).toBe(2);

    chart.destroy();
  });
});