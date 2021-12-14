
import { some } from '@antv/util';
import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('#3743', () => {
  it('bar with corner radius', () => {
    const data = [
      { type: 'IT 通讯电子', value: 491 },
      { type: '社会公共管理', value: 672 },
      { type: '医疗卫生', value: 868 },
      { type: '金融保险', value: 1234 },
    ];
    const chart = new Chart({
      container: createDiv(),
      autoFit: true,
      height: 500,
    });
    chart.data(data);
    chart.coordinate({ actions: [['transpose'], ['reflect', 'y']] });

    chart
      .interval()
      .position('type*value')
      .style({
        radius: [4, 8, 12, 10]
      });
    chart.render();

    const path = chart.geometries[0].elements[0].shape.attr('path');
    const numbers = path.reduce((r, p) => {
      r.push(...p.slice(1));
      return r;
    }, [])
    // 不应该小于 0 
    expect(some(numbers, n => n < 0)).not.toBeTruthy();
  });
});