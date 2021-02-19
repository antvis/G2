import { Chart } from '../../../src';
import { COMPONENT_TYPE } from '../../../src/constant';
import { removeDom } from '../../../src/util/dom';
import { CITY_SALE } from '../../util/data';
import { createDiv } from '../../util/dom';

describe('legend checked', () => {
  const div = createDiv();

  const chart = new Chart({
    container: div,
    width: 400,
    height: 300,
    autoFit: false,
  });

  chart.data(CITY_SALE);

  chart.interval().position('city*sale').color('category').adjust({ type: 'dodge' });

  it('filter data', () => {
    chart.filter('category', (v) => v === '鼠标');
    chart.interaction('legend-filter', {
      start: [{ trigger: 'legend-item:click', action: ['list-checked:toggle', 'data-filter:filter'] }],
    });
    chart.render();
    const legend = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND)[0].component;
    const items = legend.get('items').map((item) => ({
      value: item.value,
      unchecked: item.unchecked,
    }));

    expect(items).toEqual([
      { value: '电脑', unchecked: true },
      { value: '鼠标', unchecked: false },
    ]);
  });

  it('emit click', () => {
    chart.filter('category', null);
    chart.render(true);

    const legend = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND)[0].component;
    const target = legend.get('container').findById('-legend-item-电脑-name');
    chart.emit('legend-item:click', { x: 50, y: 330, target });

    let items = legend.get('items').map((item) => ({
      value: item.value,
      unchecked: item.unchecked,
    }));
    expect(items).toEqual([
      { value: '电脑', unchecked: false },
      { value: '鼠标', unchecked: true },
    ]);
    // toggle
    chart.emit('legend-item:click', { x: 50, y: 330, target });
    items = legend.get('items').map((item) => ({
      value: item.value,
      unchecked: item.unchecked,
    }));
    expect(items).toEqual([
      { value: '电脑', unchecked: false },
      { value: '鼠标', unchecked: false },
    ]);
  });

  afterAll(() => {
    chart.destroy();
    removeDom(div);
  });
});
