import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('#2085', () => {
  it('shape() values', () => {
    const chart = new Chart({
      container: createDiv(),
      width: 400,
      height: 300,
      options: {
        coordinate: {
          type: 'cartesian',
          actions: [['transpose'], ['scale', 1, -1]],
        },
        data: [
          { action: '浏览网站', pv: 50000, percent: 1 },
          { action: '放入购物车', pv: 35000, percent: 0.7 },
          { action: '生成订单', pv: 25000, percent: 0.5 },
          { action: '支付订单', pv: 15000, percent: 0.3 },
          { action: '完成交易', pv: 8000, percent: 0.16 },
        ],
        geometries: [
          {
            type: 'interval',
            adjust: 'symmetric',
            position: {
              fields: ['action', 'percent'],
            },
            shape: {
              values: ['funnel'],
            },
            color: {
              fields: ['action'],
            },
          },
        ],
      },
    });

    chart.render();

    const shapeAttr = chart.geometries[0].getAttribute('shape');
    expect(shapeAttr.scales.length).toBe(1);
    expect(shapeAttr.scales[0].values).toEqual(['funnel']);
    expect(shapeAttr.scales[0].type).toBe('identity');
  });
});
