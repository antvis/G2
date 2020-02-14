import DataSet from '@antv/data-set';
import { Chart } from '../../src';
import { createDiv, removeDom } from '../util/dom';

describe('#2049', () => {
  let chart;
  const container = createDiv();
  it('interval', () => {
    chart = new Chart({
      container,
      height: 300,
      width: 300,
      padding: 30,
    });

    const data = [
      { year: '1951 年', sales: 280 },
      { year: '1952 年', sales: 52 },
      { year: '1956 年', sales: 61 },
      { year: '1957 年', sales: 145 },
      { year: '1958 年', sales: 48 },
      { year: '1959 年', sales: 38 },
      { year: '1960 年', sales: 38 },
      { year: '1962 年', sales: 38 },
    ];
    chart.data(data);
    chart.animate(false);
    chart.interval().position('year*sales');
    chart.render();

    expect(chart.geometries[0].elements[0].shape.getBBox().width).toBe(15);

    chart.changeData(data.slice(6));
    expect(chart.geometries[0].elements[0].shape.getBBox().width).toBe(60);
  });

  it('schema', () => {
    const data = [
      { x: 'Oceania', low: 1, q1: 9, median: 16, q3: 22, high: 24 },
      { x: 'East Europe', low: 1, q1: 5, median: 8, q3: 12, high: 16 },
      { x: 'Australia', low: 1, q1: 8, median: 12, q3: 19, high: 26 },
      { x: 'South America', low: 2, q1: 8, median: 12, q3: 21, high: 28 },
      { x: 'North Africa', low: 1, q1: 8, median: 14, q3: 18, high: 24 },
    ];
    const dv = new DataSet.DataView().source(data);
    dv.transform({
      type: 'map',
      callback: obj => {
        obj.range = [obj.low, obj.q1, obj.median, obj.q3, obj.high];
        return obj;
      }
    });

    chart = new Chart({
      container,
      height: 300,
      width: 400,
      padding: 40,
    });

    chart.data(dv.rows);
    chart.animate(false);

    chart
      .schema()
      .position('x*range')
      .shape('box');
    chart.render();

    expect(chart.geometries[0].elements[0].shape.getBBox().width).toBeCloseTo(33.29552450390903);

    chart.changeData(dv.rows.slice(4));
    expect(chart.geometries[0].elements[0].shape.getBBox().width).toBeCloseTo(162.9163240016402);
  });

  afterEach(() => {
    chart.destroy();
    removeDom(container);
  });
});
