import { Chart } from '../../../src/';
import { removeDom, createDiv } from '../../util/dom';

describe('Geometry theme', () => {
  const container = createDiv();
  const chart = new Chart({
    container,
    autoFit: false,
    width: 400,
    height: 300,
  });
  chart.data([
    { year: '1951 年', sales: 38, value: 23 },
    { year: '1952 年', sales: 52, value: 2 },
    { year: '1956 年', sales: 61, value: 23 },
    { year: '1957 年', sales: 145, value: 23 },
    { year: '1958 年', sales: 48, value: 23 },
    { year: '1959 年', sales: 38, value: 23 },
    { year: '1960 年', sales: 38, value: 23 },
    { year: '1962 年', sales: 38, value: 23 },
  ]);
  const interval1 = chart.interval({
    theme: {
      maxColumnWidth: 10,
    }
  }).position('year*sales');
  const interval2 = chart.interval({
    theme: {},
  }).position('year*sales');
  chart.render();

  it('interval theme', () => {
    expect(interval1.theme.maxColumnWidth).toBe(10);
    expect(interval2.theme.maxColumnWidth).toBeNull();
    expect(interval2.theme).toEqual(chart.getTheme());
  });

  it('interval size', () => {
    const interval1Shape = interval1.elements[0].shape;
    const interval2Shape = interval2.elements[0].shape;
    expect(interval1Shape.getBBox().width).toBe(10);
    expect(interval2Shape.getBBox().width).toBeCloseTo(23.201171875);
  });

  afterAll(() => {
    chart.destroy();
    removeDom(container);
  });
});
