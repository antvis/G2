import { Chart } from '../../src';
import { COMPONENT_TYPE } from '../../src/constant';
import { createDiv } from '../util/dom';

describe('#5409', () => {
  const data = [
    { type: '我是一段很长很长很长很长很长的文本', value: 654, percent: 0.02 },
    { type: '18-24 岁', value: 4400, percent: 0.2 },
    { type: '25-29 岁', value: 5300, percent: 0.24 },
    { type: '30-39 岁', value: 6200, percent: 0.28 },
    { type: '40-49 岁', value: 3300, percent: 0.14 },
    { type: '50 岁以上', value: 1500, percent: 0.06 },
    { type: '未知', value: 654, percent: 0.02 },
  ];
  const container = createDiv();
  const chart = new Chart({
    container,
    width: 400,
    height: 300,
    autoFit: true,
  });
  chart.data(data);
  chart.interval().position('type*value').color('type');
  chart.render();
  it('legend tooltip position should be changed when chart resize', async () => {
    const legend = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND)[0];
    const legendTarget = legend.component
      .get('container')
      .findById('-legend-item-我是一段很长很长很长很长很长的文本-name');

    chart.emit('legend-item-name:mousemove', {
      x: 50,
      y: 330,
      target: legendTarget,
    });

    const tooltipDom = container.getElementsByClassName('g2-tooltip')[0] as HTMLElement;
    expect(tooltipDom.style.visibility).toBe('visible');

    const top = tooltipDom.style.top;
    chart.emit('legend-item-name:mouseleave', {
      target: legendTarget,
    });
    // 等待 render 完毕
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('');
      }, 100);
    });
    chart.changeSize(400, 500);
    chart.emit('legend-item-name:mousemove', {
      x: 50,
      y: 480,
      target: legendTarget,
    });
    expect(tooltipDom.style.visibility).toBe('visible');
    // top 应该不一致
    expect(tooltipDom.style.top).not.toBe(top);
  });
});
