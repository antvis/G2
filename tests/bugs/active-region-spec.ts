import { Chart } from '../../src';
import { createDiv, simulateMouseEvent } from '../util/dom';

describe('active-region', () => {
  it('dodge polar', () => {
    const container = createDiv();
    const data = [
      { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
      { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
      { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
      { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
      { name: 'London', 月份: 'May', 月均降雨量: 47 },
      { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
      { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
      { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
      { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
      { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
      { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
      { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
      { name: 'Berlin', 月份: 'May', 月均降雨量: 52.6 },
      { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
      { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
      { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 },
    ];

    const chart = new Chart({
      container,
      width: 400,
      height: 300,
    });

    chart.coordinate('polar', {
      innerRadius: 0.4
    });

    chart.data(data);
    chart.tooltip({
      showMarkers: false,
      shared: true,
      showContent: false
    });

    chart
      .interval()
      .position('月份*月均降雨量')
      .color('name')
      .adjust([
        {
          type: 'dodge',
          marginRatio: 1,
        },
      ]);

    chart.interaction('active-region');
    chart.render();

    const point = chart.getXY({ name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 });
    chart.emit('plot:mousemove', point);
    const regionShape = chart.backgroundGroup.findAll((el) => {
      return el.get('name') === 'active-region';
    })[0];

    expect(regionShape.getBBox().width).toBeCloseTo(96.24487867752643);
    expect(regionShape.getBBox().height).toBeCloseTo(79.27885913672948);
  });
});
