import { Chart } from '../../src';
import { createDiv, removeDom } from '../util/dom';

describe('tooltip colorShapeIsLinear', () => {
  const container = createDiv();

  const data = [
    { time: '03-19', type: 1000, value: 32000 },
    { time: '03-19', type: 300, value: 30000 },
    { time: '03-19', type: 1130, value: 27000 },
    { time: '03-19', type: 110, value: 24000 },
    { time: '03-20', type: 1000, value: 35000 },
    { time: '03-20', type: 300, value: 32000 },
    { time: '03-20', type: 1130, value: 30000 },
    { time: '03-20', type: 110, value: 27000 },
    { time: '03-21', type: 1000, value: 39000 },
    { time: '03-21', type: 300, value: 37000 },
    { time: '03-21', type: 1130, value: 34000 },
    { time: '03-21', type: 110, value: 30000 },
    { time: '03-22', type: 1000, value: 44000 },
    { time: '03-22', type: 300, value: 42000 },
    { time: '03-22', type: 1130, value: 38000 },
    { time: '03-22', type: 110, value: 34000 },
    { time: '03-23', type: 1000, value: 47000 },
    { time: '03-23', type: 300, value: 44000 },
    { time: '03-23', type: 1130, value: 40000 },
    { time: '03-23', type: 110, value: 36000 },
    { time: '03-24', type: 1000, value: 48000 },
    { time: '03-24', type: 300, value: 46000 },
    { time: '03-24', type: 1130, value: 42000 },
    { time: '03-24', type: 110, value: 38000 },
    { time: '03-25', type: 1000, value: 50000 },
    { time: '03-25', type: 300, value: 48000 },
    { time: '03-25', type: 1130, value: 44000 },
    { time: '03-25', type: 110, value: 38000 }
  ];

  const chart = new Chart({
    container,
    autoFit: true,
    height: 500,
  });

  chart.data(data);

  chart.scale('value', {
    alias: '金额(元)'
  });

  chart.tooltip({
    shared: true,
    showMarkers: false,
  });

  chart.interaction('active-region');

  chart
    .interval()
    .adjust('stack')
    .position('time*value')
    .color('type', ['#40a9ff', '#1890ff', '#096dd9', '#0050b3']);

  chart.render();

  it('tooltip colorShapeIsLinear', () => {

    const tooltipItems = chart.getTooltipItems(chart.getXY({ time: '03-25', type: 110, value: 38000 }));

    // 保证 tooltip dom 只有一个
    expect(tooltipItems.length).toBe(4);
    expect(tooltipItems[0].name).toBe('1000');
    expect(tooltipItems[3].name).toBe('110');
    expect(tooltipItems[0].value).toBe('50000');
    expect(tooltipItems[3].value).toBe('38000');
  });

  afterAll(() => {
    chart.destroy();
    removeDom(container);
  });
});
