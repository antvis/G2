import { get } from '@antv/util';

import { Chart } from '../../../src/';
import { COMPONENT_TYPE } from '../../../src/constant';
import { CITY_SALE } from '../../util/data';
import { createDiv } from '../../util/dom';

describe('Component', () => {
  const div = createDiv();

  const chart = new Chart({
    container: div,
    height: 600,
    autoFit: true,
  });

  chart.data(CITY_SALE);
  chart.axis('sale', {
    title: { },
  });
  chart.interval().position('city*sale').color('category').adjust('stack');

  chart.render();

  it('line axis component', () => {
    const axes = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.AXIS);
    expect(axes.length).toBe(2);

    // test the component theme config
    const [x, y] = axes;
    // @ts-ignore
    expect(x.component.get('label').offset).toBe(get(chart.getTheme(), ['components', 'axis', 'bottom', 'label', 'offset']));
    // @ts-ignore
    expect(y.component.get('title').offset).toBeCloseTo(46.0159912109375);
    expect(y.component.get('title').spacing).toBe(get(chart.getTheme(), ['components', 'axis', 'common', 'title', 'spacing']));
    // @ts-ignore
    expect(y.component.get('label').offset).toBe(get(chart.getTheme(), ['components', 'axis', 'bottom', 'label', 'offset']));
  });
});

describe('line position', () => {
  const chart = new Chart({
    container: createDiv(),
    height: 600,
    autoFit: true,
  });

  chart.data(CITY_SALE);

  chart.interval().position('city*sale').color('category');

  chart.axis('sale', {
    position: 'right',
  });

  it('line position right', () => {
    chart.render();

    const [x, y] = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.AXIS);

    // y 轴在右侧
    expect(y.component.get('start').x).toBeGreaterThan(500);
  });
});
