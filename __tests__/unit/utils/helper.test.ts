import { Band, Constant } from '@antv/scale';
import { groupNameOf, dataOf, seriesOf } from '../../../src/utils/helper';
import { Chart } from '../../../src';
import { createNodeGCanvas } from '../../integration/utils/createNodeGCanvas';
import { G2Element } from '../../../src/utils/selection';

describe('groupNameOf', () => {
  it('should handle band series scale', () => {
    const seriesScale = new Band();
    seriesScale.update({ domain: ['A', 'B', 'C', 'D'], range: [0, 1] });
    const scale = { series: seriesScale };
    const datum = { series: 0.25 };
    expect(groupNameOf(scale, datum)).toBe('B');
  });

  it('should return null for constant scale', () => {
    const seriesScale = new Constant();
    seriesScale.update({ domain: [1], range: [1] });
    const scale = { series: seriesScale };
    const datum = { series: 1 };
    expect(groupNameOf(scale, datum)).toBeNull();
  });
});

describe('seriesOf', () => {
  const chart = new Chart({
    canvas: createNodeGCanvas(640, 480),
  });

  it('should return null for non-series mark', async () => {
    const data = [
      { x: 1, y: 10 },
      { x: 2, y: 20 },
    ];
    chart.options({
      type: 'interval',
      data,
      encode: {
        x: 'x',
        y: 'y',
      },
    });

    await chart.render();

    const rects = chart
      .getContext()
      ?.canvas?.document.getElementsByClassName('element');
    const firstRect = rects?.[0] as G2Element;
    const name = seriesOf(firstRect);

    expect(name).toBe(null);
  });

  it('should get series value from grouped data', async () => {
    const data = [
      { year: '2020', value: 10, type: 'A' },
      { year: '2020', value: 20, type: 'B' },
      { year: '2021', value: 15, type: 'A' },
      { year: '2021', value: 25, type: 'B' },
    ];

    chart.options({
      type: 'interval',
      data,
      encode: {
        x: 'year',
        y: 'value',
        color: 'type',
        series: 'type',
      },
    });

    await chart.render();

    const rects = chart
      .getContext()
      ?.canvas?.document.getElementsByClassName('element');
    const firstRect = rects?.[1] as G2Element;
    const name = seriesOf(firstRect);

    expect(name).toBe('B');
  });
});

describe('dataOf', () => {
  const chart = new Chart({
    canvas: createNodeGCanvas(640, 480),
  });

  it('should get single data point from interval element', async () => {
    const data = [
      { x: 1, y: 10 },
      { x: 2, y: 20 },
    ];
    chart.options({
      type: 'interval',
      data,
      encode: {
        x: 'x',
        y: 'y',
      },
    });

    await chart.render();

    const rects = chart
      .getContext()
      ?.canvas?.document.getElementsByClassName('element');
    const firstRect = rects?.[0] as G2Element;
    const originalData = dataOf(firstRect);

    expect(originalData).toEqual(data[0]);
  });

  it('should get series data from grouped interval element', async () => {
    const data = [
      { year: '2020', value: 10, type: 'A' },
      { year: '2020', value: 20, type: 'B' },
      { year: '2021', value: 15, type: 'A' },
      { year: '2021', value: 25, type: 'B' },
    ];

    chart.options({
      type: 'interval',
      data,
      encode: {
        x: 'year',
        y: 'value',
        color: 'type',
      },
    });

    await chart.render();

    const rects = chart
      .getContext()
      ?.canvas?.document.getElementsByClassName('element');
    const firstRect = rects?.[0] as G2Element;
    const seriesData = dataOf(firstRect);

    expect(seriesData).toEqual({ year: '2020', value: 10, type: 'A' });
  });
});
