import { expect } from 'chai';
import { Plot } from '../../src';

describe('#2272', () => {
  const div = document.createElement('div');
  div.id = '#2272';
  document.body.appendChild(div);
  it('#2272', () => {
    const data = [
      { type: '一线城市', value: 0.19 },
      { type: '二线城市', value: 0.21 },
      { type: '三线城市', value: 0.27 },
      { type: '四线及以下', value: null },
    ];
    const chart = new Plot({
      containerId: '#2272',
      width: 400,
      height: 300,
    });
    chart.data(data);
    chart.coordinate('theta', {
      radius: 0.75,
      innerRadius: 0.4,
    });
    chart
      .interval()
      .adjust('stack')
      .position('1*value')
      .color('type', ['#063d8a', '#1770d6', '#47abfc', '#38c060'])
      .label('type');

    expect(() => {
      chart.render();
    }).not.throw();
  });
});
