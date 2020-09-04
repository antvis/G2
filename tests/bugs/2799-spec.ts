import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('#2799', () => {
  it('2799', () => {
    const data = [
      { type: '一线城市', value: 0.19 },
      { type: '二线城市', value: 0.21 },
      { type: '三线城市', value: 0.27 },
      { type: '四线及以下', value: 0.33 },
    ];
    const chart = new Chart({
      container: createDiv(),
      autoFit: true,
      height: 500,
      padding: 'auto',
    });

    chart.data(data);
    chart.coordinate({ type: "theta" });
    chart.interval().adjust('stack').position('value').label('type').color('type');

    chart.render();

    // clear
    chart.clear();

    // 重新设置
    chart.data(data);
    chart.coordinate({ type: "theta" });
    chart.interval().adjust('stack').position('value').label('type').color('type');

    chart.render();

    // @ts-ignore
    window.chart = chart;

    expect(chart.middleGroup.getChildren().length).toBe(1);
  });
});
