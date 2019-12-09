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

  chart
    .interval()
    .position('city*sale')
    .color('category');

  chart.render();

  it('line axis component', () => {
    const axes = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.AXIS);
    expect(axes.length).toBe(2);

    // test the component theme config
    const [x, y] = axes;
    // @ts-ignore
    expect(x.component.get('label').offset).toBe(16);
    // TODO @antv/component 直接修改 title 配置导致单测失败，等待更新
    // @ts-ignore
    // expect(y.component.get('title').offset).toBe(32);
    // @ts-ignore
    expect(y.component.get('label').offset).toBe(8);
  });
});
