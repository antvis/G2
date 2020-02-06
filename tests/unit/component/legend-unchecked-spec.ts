import { Chart } from '../../../src/';
import { COMPONENT_TYPE } from '../../../src/constant';
import { GroupComponent, GroupComponentCfg } from '../../../src/dependents';
import { CITY_SALE, DIAMOND } from '../../util/data';
import { createDiv } from '../../util/dom';

describe('legend unchecked', () => {

  it('category', () => {
    const div = createDiv();

    const chart = new Chart({
      container: div,
      width: 400,
      height: 300,
      autoFit: false,
    });

    chart.data(CITY_SALE);

    chart
      .interval()
      .position('city*sale')
      .color('category')
      .adjust({ type: 'dodge' });


    chart.filter('category', (v) => v === '电脑');
    chart.interaction('legend-filter');

    chart.render();

    const legend = chart.getComponents().filter(co => co.type === COMPONENT_TYPE.LEGEND)[0].component;

    const items = legend.get('items').map(item => ({
      value: item.value,
      unchecked: item.unchecked,
    }));

    expect(items).toEqual([
      { value: '电脑', unchecked: false },
      { value: '鼠标', unchecked: true },
    ]);
  });
});
