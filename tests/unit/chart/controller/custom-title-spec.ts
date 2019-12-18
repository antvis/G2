import { Chart } from '../../../../src/chart';
import { registerComponentController, unregisterComponentController } from '../../../../src/chart/controller';
import defaultLayout from '../../../../src/chart/layout';
import View from '../../../../src/chart/view';
import { CITY_SALE } from '../../../util/data';
import { createDiv } from '../../../util/dom';
import { Title } from './title';

function layout(view: View) {
  const title = view.getController('title');
  title.layout();

  defaultLayout(view);
}

describe('title controller', () => {
  registerComponentController('title', Title);

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
  const titleOption = {
    title: '这个是自定义图表标题 Title',
    style: {
      fontSize: 16,
      color: '#333',
    },
    padding: [8, 16, 16, 16],
  };
  chart.option('title', titleOption);

  // 指定 layout
  chart.setLayout(layout);

  it('chart with title', () => {
    chart.render();

    const title = chart.getController('title');
    expect(title.getComponents().length).toBe(1);

    const comp = title.getComponents()[0].component;
    // @ts-ignore
    expect(comp.text.attr('text')).toBe('这个是自定义图表标题 Title');

    const { x, y } = comp.getBBox();

    // padding
    expect(x).toBe(16);
    expect(y).toBe(8);
  });

  it('update', () => {
    chart.option('title', {
      ...titleOption,
      title: '修改标题',
    });

    const title = chart.getController('title');

    const preComp = title.getComponents()[0].component;

    // update 逻辑
    chart.render(true);

    const comp = title.getComponents()[0].component;
    // @ts-ignore
    expect(comp.text.attr('text')).toBe('修改标题');
    // 更新，组件实例引用不变
    expect(preComp).toBe(comp);
  });

  afterAll(() => {
    unregisterComponentController('title');
  });
});
