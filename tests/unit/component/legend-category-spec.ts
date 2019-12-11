import { Chart } from '../../../src/';
import { COMPONENT_TYPE } from '../../../src/constant';
import { CITY_SALE } from '../../util/data';
import { createDiv } from '../../util/dom';

describe('Component', () => {
  const div = createDiv();

  const chart = new Chart({
    container: div,
    width: 800,
    height: 600,
    padding: 16,
    autoFit: false,
  });

  chart.data(CITY_SALE);

  chart
    .interval()
    .position('city*sale')
    .color('category')
    .adjust({ type: 'dodge' });

  it('close legend', () => {
    chart.legend(false);
    chart.render();
    const legends = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND);
    expect(legends.length).toBe(0);
  });

  it('legend component', () => {
    chart.legend('category', {
      position: 'right',
    });

    chart.render();
    const legends = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND);
    expect(legends.length).toBe(1);

    const legend = legends[0].component;
    // @ts-ignore
    const items: any[] = legend.get('items');

    // two legend items
    expect(items.length).toBe(2);

    // legend item style
    expect(items[0].name).toBe('电脑');
    expect(items[1].name).toBe('鼠标');
    expect(items[0].marker.fill).toBe('#5B8FF9');
    expect(items[1].marker.fill).toBe('#5AD8A6');

    // position
    // @ts-ignore
    const x: any[] = legend.get('x');

    // right
    expect(x).toBeGreaterThan(700);
  });
});
