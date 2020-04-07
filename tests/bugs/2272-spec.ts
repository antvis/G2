import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('#2272', () => {
  it('#2272', () => {
    const data = [
      { type: '一线城市', value: 0.19 },
      { type: '二线城市', value: 0.21 },
      { type: '三线城市', value: 0.27 },
      { type: '四线及以下', value: null },
    ];
    const chart = new Chart({
      container: createDiv(),
      width: 400,
      height: 300,
      localRefresh: false, // 暂时关闭
    });
    chart.data(data);
    chart.coordinate('theta', {
      radius: 0.75,
      innerRadius: 0.4
    });
    chart.tooltip({
      showMarkers: false
    });

    const interval = chart
      .interval()
      .adjust('stack')
      .position('value')
      .color('type', ['#063d8a', '#1770d6', '#47abfc', '#38c060'])
      .label('type', (val) => {
        const opacity = val === '四线及以下' ? 1 : 0.5;
        return {
          offset: -10,
          style: {
            opacity,
            fill: 'white',
            fontSize: 12,
            shadowBlur: 2,
            shadowColor: 'rgba(0, 0, 0, .45)',
          },
          content: (obj) => {
            return obj.type + '\n' + obj.value + '%';
          },
        };
      });

    expect(() => {
      chart.render();
    }).not.toThrow();

    expect(interval.elements.length).toBe(4);
    // expect(interval.container.getBBox().width).not.toBe(Infinity);
    // expect(interval.container.getBBox().height).not.toBe(Infinity);
  });
});
