import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('pie unselected animate', () => {
  const data = [
    { year: '1951 年', sales: 38 },
    { year: '1952 年', sales: 52 },
    { year: '1956 年', sales: 61 },
    { year: '1957 年', sales: 145 }
  ];
  const chart = new Chart({
    container: createDiv(),
    width: 400,
    height: 300,
  });
  chart.tooltip({
    showMarkers: false,
    follow: true
  });
  chart.data(data);
  chart.interaction('element-active');
  chart.interaction('pie-selected');

  chart.coordinate('theta');

  const interval = chart
    .interval()
    .position('sales').color('year')
    .adjust('stack');

  chart.render();
  it('set selected', () => {
    interval.elements[0].setState('selected', true);
  });
});