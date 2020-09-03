import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('#2778', () => {
  it('饼图交互click事件有概率丢失数据', () => {
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

    const labelShapes = chart.foregroundGroup.findAllByName('label');
    expect(labelShapes[0].get('origin').data).not.toBeUndefined();
    expect(labelShapes[0].get('origin').data).toEqual(data[0]);
  });
});
