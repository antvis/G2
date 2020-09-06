import { Chart } from '../../src';
import { createDiv } from '../util/dom';
import { COMPONENT_TYPE } from '../../src/constant';
import { CITY_SALE } from '../util/data';

describe('#2763', () => {
  it('legend filter not work in view', () => {
    const div = createDiv();

    const chart = new Chart({
      container: div,
      width: 400,
      height: 300,
      autoFit: false,
    });

    const view = chart.createView();

    view.data(CITY_SALE);

    view.interval().position('city*sale').color('category').adjust({ type: 'dodge' });

    view.filter('category', (v) => v === '电脑');
    view.interaction('legend-filter');

    chart.render();

    const legend = chart.getController('legend').getComponents()[0].component;

    const items = legend.get('items').map((item) => ({
      value: item.value,
      unchecked: item.unchecked,
    }));

    expect(items).toEqual([
      { value: '电脑', unchecked: false },
      { value: '鼠标', unchecked: true },
    ]);
  });

  it('multi view', () => {
    const div = createDiv();

    const chart = new Chart({
      container: div,
      width: 400,
      height: 300,
      autoFit: false,
    });

    const view = chart.createView();
    const view2 = chart.createView();

    view.data(CITY_SALE);
    view2.data(CITY_SALE);

    view.interval().position('city*sale').color('category').adjust({ type: 'dodge' });

    view.filter('category', (v) => v === '电脑');
    view.interaction('legend-filter');

    chart.render();

    const legend = chart.getController('legend').getComponents()[0].component;

    const items = legend.get('items').map((item) => ({
      value: item.value,
      unchecked: item.unchecked,
    }));

    expect(items).toEqual([
      { value: '电脑', unchecked: false },
      { value: '鼠标', unchecked: true },
    ]);
  });
});
