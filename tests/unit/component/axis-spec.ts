import { Chart } from '../../../src/';
import { COMPONENT_TYPE } from '../../../src/constant';
import { CITY_SALE } from '../../util/data';
import { createDiv } from '../../util/dom';

describe('Chart', () => {
  const div = createDiv();

  const chart = new Chart({
    container: div,
    width: 800,
    height: 600,
    padding: 10,
  });

  chart.data(CITY_SALE);

  chart
    // @ts-ignore
    .interval()
    .position('city*sale')
    .color('category');

  chart.render();
  // chart.render();

  it('axis component', () => {
    const axes = chart.getOptions().components.filter((co) => co.type === COMPONENT_TYPE.AXIS);
    expect(axes.length).toBe(2);

    // test the component theme config
    const [x, y] = axes;
    // @ts-ignore
    expect(x.component.get('label').offset).toBe(16);
    // @ts-ignore
    expect(y.component.get('title').offset).toBe(32);
    // @ts-ignore
    expect(y.component.get('label').offset).toBe(8);
  });

  // @ts-ignore
  window.__chart = chart;
});
