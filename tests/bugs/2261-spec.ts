import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('#2261', () => {
  it('tooltip items', () => {
    const data = [
      {
        "time": 1585796640000,
        "value": 1,
        "type": "a"
      },
      {
        "time": 1585796640000,
        "value": 3,
        "type": "b"
      },
      {
        "time": 1585796700000,
        "value": 3,
        "type": "b"
      },
      {
        "time": 1585796760000,
        "value": 3,
        "type": "b"
      },
      {
        "time": 1585796820000,
        "value": 3,
        "type": "b"
      },
      {
        "time": 1585796880000,
        "value": 3,
        "type": "b"
      },
      {
        "time": 1585796940000,
        "value": 3,
        "type": "b"
      },
      {
        "time": 1585797000000,
        "value": 6,
        "type": "b"
      },
      {
        "time": 1585797060000,
        "value": 3,
        "type": "b"
      },
      {
        "time": 1585797120000,
        "value": 5,
        "type": "b"
      },
      {
        "time": 1585797180000,
        "value": 5,
        "type": "b"
      },
      {
        "time": 1585797240000,
        "value": 4,
        "type": "b"
      },
      {
        "time": 1585797300000,
        "value": 6,
        "type": "b"
      },
      {
        "time": 1585797360000,
        "value": 5,
        "type": "b"
      },
      {
        "time": 1585797420000,
        "value": 4,
        "type": "b"
      },
      {
        "time": 1585797480000,
        "value": 3,
        "type": "b"
      },
      {
        "time": 1585797540000,
        "value": 3,
        "type": "b"
      },
      {
        "time": 1585797600000,
        "value": 3,
        "type": "b"
      },
      {
        "time": 1585797660000,
        "value": 3,
        "type": "b"
      },
      {
        "time": 1585797720000,
        "value": 3,
        "type": "b"
      },
      {
        "time": 1585797780000,
        "value": 2,
        "type": "a"
      },
      {
        "time": 1585797780000,
        "value": 4,
        "type": "b"
      },
      {
        "time": 1585797840000,
        "value": 5,
        "type": "b"
      },
      {
        "time": 1585797900000,
        "value": 3,
        "type": "b"
      },
      {
        "time": 1585797960000,
        "value": 3,
        "type": "b"
      },
      {
        "time": 1585798020000,
        "value": 3,
        "type": "b"
      },
      {
        "time": 1585798080000,
        "value": 1,
        "type": "OPS_EVENT"
      },
      {
        "time": 1585798080000,
        "value": 4,
        "type": "b"
      },
      {
        "time": 1585798140000,
        "value": 3,
        "type": "b"
      },
      {
        "time": 1585798200000,
        "value": 4,
        "type": "b"
      },
      {
        "time": 1585798260000,
        "value": 4,
        "type": "b"
      },
      {
        "time": 1585798320000,
        "value": 3,
        "type": "b"
      },
      {
        "time": 1585798380000,
        "value": 4,
        "type": "b"
      },
      {
        "time": 1585798440000,
        "value": 4,
        "type": "b"
      },
      {
        "time": 1585798500000,
        "value": 3,
        "type": "b"
      },
      {
        "time": 1585798560000,
        "value": 4,
        "type": "b"
      },
      {
        "time": 1585798620000,
        "value": 1,
        "type": "a"
      },
      {
        "time": 1585798620000,
        "value": 5,
        "type": "b"
      },
      {
        "time": 1585798680000,
        "value": 3,
        "type": "b"
      },
      {
        "time": 1585798740000,
        "value": 4,
        "type": "b"
      },
      {
        "time": 1585798800000,
        "value": 3,
        "type": "b"
      },
      {
        "time": 1585798860000,
        "value": 3,
        "type": "b"
      },
      {
        "time": 1585798920000,
        "value": 3,
        "type": "b"
      },
      {
        "time": 1585798980000,
        "value": 1,
        "type": "a"
      },
      {
        "time": 1585798980000,
        "value": 4,
        "type": "b"
      },
      {
        "time": 1585799040000,
        "value": 3,
        "type": "b"
      },
      {
        "time": 1585799100000,
        "value": 4,
        "type": "b"
      },
      {
        "time": 1585799160000,
        "value": 1,
        "type": "a"
      },
      {
        "time": 1585799160000,
        "value": 5,
        "type": "b"
      },
      {
        "time": 1585799220000,
        "value": 5,
        "type": "b"
      },
      {
        "time": 1585799280000,
        "value": 3,
        "type": "b"
      },
      {
        "time": 1585799340000,
        "value": 4,
        "type": "b"
      },
      {
        "time": 1585799400000,
        "value": 3,
        "type": "b"
      },
      {
        "time": 1585799460000,
        "value": 5,
        "type": "b"
      },
      {
        "time": 1585799520000,
        "value": 3,
        "type": "b"
      },
      {
        "time": 1585799580000,
        "value": 3,
        "type": "b"
      },
      {
        "time": 1585799640000,
        "value": 3,
        "type": "b"
      },
      {
        "time": 1585799700000,
        "value": 1,
        "type": "a"
      },
      {
        "time": 1585799700000,
        "value": 4,
        "type": "b"
      },
      {
        "time": 1585799760000,
        "value": 4,
        "type": "b"
      },
      {
        "time": 1585799820000,
        "value": 5,
        "type": "b"
      },
      {
        "time": 1585799880000,
        "value": 26,
        "type": "a"
      },
      {
        "time": 1585799880000,
        "value": 3,
        "type": "b"
      },
      {
        "time": 1585799940000,
        "value": 3,
        "type": "b"
      },
      {
        "time": 1585800000000,
        "value": 1,
        "type": "RISK_EVENT"
      },
      {
        "time": 1585800000000,
        "value": 4,
        "type": "b"
      },
      {
        "time": 1585800060000,
        "value": 5,
        "type": "b"
      },
      {
        "time": 1585800120000,
        "value": 3,
        "type": "b"
      },
      {
        "time": 1585800180000,
        "value": 4,
        "type": "b"
      }
    ];

    // Step 1: 创建 Chart 对象
    const chart = new Chart({
      container: createDiv(), // 指定图表容器 ID
      height: 300, // 指定图表高度
      width: 600,
    });
    chart.scale('time', { type: 'time', mask: 'HH:mm' });
    chart.tooltip({
      shared: true,
      itemTpl:
        '<li style="padding-bottom: 14px;">' +
        '<span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>' +
        '{value}' +
        `<a style="margin-left:10px;" data-handler="true" data-time="{time}" data-type="{type}">详情</a>` +
        '</li>',
    });
    chart.animate(false);
    chart.data(data);
    chart
      .interval()
      .adjust('stack')
      .position('time*value')
      .tooltip('type*value*time', (type, value, time) => ({
        type,
        value,
        time,
      }))
      .color('type');
    chart.render();

    const tooltipItems = chart.getTooltipItems({
      x: 264,
      y: 252,
    });
    expect(tooltipItems.length).toBe(2);
  });
});
