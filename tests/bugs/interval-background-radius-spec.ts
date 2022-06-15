import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('interval background radius', () => {
  it('bar with background radius', () => {
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
      .interval({
        background: {
          style: {
            fill: 'rgba(0,0,0,0.1)',
            radius: 12,
          },
        },
      })
      .position('type*value');

    chart.render();

    const path = chart.geometries[0].elements[0].shape.cfg.children[0].attr('path');
    const r = path[1][6] - path[0][1];
    expect(r).toBeCloseTo(12);
  });
});