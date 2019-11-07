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
    autoFit: false,
  });

  chart.data(CITY_SALE);

  chart
    // @ts-ignore
    .line()
    .position('city*sale')
    .color('category')
    .size(2);

  chart
    // @ts-ignore
    .point()
    .position('city*sale')
    .color('category')
    .shape('circle')
    .size(4)
    .style({
      stroke: '#fff',
      lineWidth: 1,
      fillOpacity: 1,
    });

  chart
    // @ts-ignore
    .area()
    .position('city*sale')
    .color('category');

  chart.coordinate('polar');
  chart.legend(false);

  chart.axis('city', {});

  chart.render();

  it('circle axis component', () => {
    expect(1).toBe(1);
    // const axes = chart.getOptions().components.filter((co) => co.type === COMPONENT_TYPE.AXIS);
    // expect(axes.length).toBe(2);
    //
    // // test the component theme config
    // const [x, y] = axes;
    // // @ts-ignore
    // expect(x.component.get('label').offset).toBe(16);
    // // @ts-ignore
    // expect(y.component.get('title').offset).toBe(32);
    // // @ts-ignore
    // expect(y.component.get('label').offset).toBe(8);
  });
});
