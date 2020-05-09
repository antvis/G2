import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('2356', () => {
  it('2356', () => {
    const data = [
      { type: '未知', value: 654, percent: 0.02 },
      { type: '17 岁以下', value: 654, percent: 0.02 },
      { type: '18-24 岁', value: 4400, percent: 0.2 },
      { type: '25-29 岁', value: 5300, percent: 0.24 },
      { type: '30-39 岁', value: 6200, percent: 0.28 },
      { type: '40-49 岁', value: 3300, percent: 0.14 },
      { type: '50 岁以上', value: 1500, percent: 0.06 },
    ];

    const chart = new Chart({
      container: createDiv(),
      width: 400,
      height: 300,
      padding: [50, 20, 50, 20],
    });
    chart.data(data);
    chart.animate(false);
    chart.scale('value', {
      alias: '销售额(万)',
    });

    chart.axis('type', {
      tickLine: {
        alignTick: false,
      },
    });
    chart.axis('value', false);

    chart.tooltip({
      showMarkers: false,
    });
    chart.interval().position('type*value');
    chart.render();

    chart.changeSize(400, 600);

    const element = chart.geometries[0].elements[4];
    expect(element.getBBox().height).toBe(500);
    expect(chart.autoPadding).toBeUndefined();
    expect(chart.padding).toEqual([50, 20, 50, 20]);

  });
});
