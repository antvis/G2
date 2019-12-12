import { Chart } from '../../../../src/chart';
import { registerComponent, unregisterComponent } from '../../../../src/chart/component';
import defaultLayout from '../../../../src/chart/layout';
import View from '../../../../src/chart/view';
import { CITY_SALE } from '../../../util/data';
import { createDiv } from '../../../util/dom';
import { Title } from './title';

function layout(view: View) {
  const title = view.getComponentPlugin('title');
  title.layout();

  defaultLayout(view);
}

describe('title plugin', () => {
  registerComponent('title', Title);

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
    .interval()
    .position('city*sale')
    .color('category');

  // 指定 title option
  chart.option('title', {
    title: '这个是自定义图表标题 Title',
    style: {
      fontSize: 16,
      color: '#333',
    },
    padding: [8, 16, 16, 16],
  });

  // 指定 layout
  chart.setLayout(layout);

  it('chart with title', () => {
    chart.render();

    const title = chart.getComponentPlugin('title');
    expect(title.getComponents().length).toBe(1);

    const { x, y } = title.getComponents()[0].component.getBBox();
    // padding
    expect(x).toBe(16);
    expect(y).toBe(8);
  });

  afterAll(() => {
    unregisterComponent('title');
  });
});
