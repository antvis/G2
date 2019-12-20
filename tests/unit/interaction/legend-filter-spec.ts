import { Chart } from '../../../src/index';
import { createDiv } from '../../util/dom';

describe('test element interaction', () => {
  const chart = new Chart({
    container: createDiv(),
    width: 400,
    height: 400,
    autoFit: false,
  });

  chart.data([
    { year: '1991', value: 13 },
    { year: '1992', value: 34 },
    { year: '1993', value: 5 },
    { year: '1994', value: 34 },
    { year: '1995', value: 20 },
    { year: '1996', value: 7 },
    { year: '1997', value: 23 },
    { year: '1998', value: 90 },
    { year: '1999', value: 3 },
  ]);
  chart.tooltip(false);
  chart.interaction('continuous-filter');
  // chart.interaction('element-range-highlight');
  chart
    .interval()
    .position('year*value')
    .color('value');
  chart.render();
  const elements = chart.geometries[0].elements;
  const first = elements[0];
  it('filter test', () => {});
});
