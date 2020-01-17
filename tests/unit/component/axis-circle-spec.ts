import { Chart } from '../../../src/';
import { COMPONENT_TYPE } from '../../../src/constant';
import { CITY_SALE } from '../../util/data';
import { createDiv, removeDom } from '../../util/dom';

describe('Component', () => {
  const div = createDiv();

  let chart = new Chart({
    container: div,
    width: 800,
    height: 600,
    padding: 'auto',
    autoFit: false,
  });

  chart.animate(false);
  chart.coordinate('polar');
  chart.data(CITY_SALE);

  chart
    .line()
    .position('city*sale')
    .color('category')
    .size(2);

  chart
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

  chart.legend('category', {
    position: 'bottom',
  });

  chart.axis('sale', {
    grid: {
      line: {
        type: 'circle',
      }
    },
  });

  chart.render();

  it('circle axis component', () => {
    const axes = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.AXIS);
    // // test the component theme config
    const [x] = axes;
    // @ts-ignore
    expect(x.component.get('title')).toBe(null);
    // @ts-ignore
    expect(x.component.get('label').offset).toBe(8);

    const grids = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.GRID);
    // circle grid 需要传入 coordinate 的 center
    expect(grids[0].component.get('center')).toEqual({ x: 400, y: 293 });
  });

  it('linear x axis ticks', () => {
    chart.destroy();
    chart = new Chart({
      container: div,
      width: 300,
      height: 300,
      padding: 10,
      autoFit: false,
    });
    chart.data([
      { x: 0, y: 0 },
      { x: 1, y: 0.0785 },
      { x: 2, y: 0.1568 },
      { x: 3, y: 0.2347 },
      { x: 4, y: 0.3119 },
      { x: 5, y: 0.3882 },
      { x: 6, y: 0.4635 },
      { x: 7, y: 0.5376 },
      { x: 8, y: 0.6101 },
    ]);
    chart.coordinate('polar');
    chart.axis('x', { grid: null });
    chart
      .line()
      .position('x*y')
      .size(2)
      .color('#ff8800');

    chart.render();
    const axes = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.AXIS);
    expect(axes.length).toBe(2);
    // @ts-ignore
    expect(axes[0].component.cfg.ticks.length).toBe(4);
    // @ts-ignore
    expect(axes[1].component.cfg.verticalFactor).toBe(1);
  });

  afterAll(() => {
    chart.destroy();
    removeDom(div);
  });
});
