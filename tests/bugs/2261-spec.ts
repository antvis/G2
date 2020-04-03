import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('#2261', () => {
  it('tooltip items', () => {
    const data = [
      {
        "timeX": 1585796640000,
        "valueY": 1,
        "type": "DB_EVENT"
      },
      {
        "timeX": 1585796640000,
        "valueY": 3,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585796700000,
        "valueY": 3,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585796760000,
        "valueY": 3,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585796820000,
        "valueY": 3,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585796880000,
        "valueY": 3,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585796940000,
        "valueY": 3,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585797000000,
        "valueY": 6,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585797060000,
        "valueY": 3,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585797120000,
        "valueY": 5,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585797180000,
        "valueY": 5,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585797240000,
        "valueY": 4,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585797300000,
        "valueY": 6,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585797360000,
        "valueY": 5,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585797420000,
        "valueY": 4,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585797480000,
        "valueY": 3,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585797540000,
        "valueY": 3,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585797600000,
        "valueY": 3,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585797660000,
        "valueY": 3,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585797720000,
        "valueY": 3,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585797780000,
        "valueY": 2,
        "type": "DB_EVENT"
      },
      {
        "timeX": 1585797780000,
        "valueY": 4,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585797840000,
        "valueY": 5,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585797900000,
        "valueY": 3,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585797960000,
        "valueY": 3,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585798020000,
        "valueY": 3,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585798080000,
        "valueY": 1,
        "type": "OPS_EVENT"
      },
      {
        "timeX": 1585798080000,
        "valueY": 4,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585798140000,
        "valueY": 3,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585798200000,
        "valueY": 4,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585798260000,
        "valueY": 4,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585798320000,
        "valueY": 3,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585798380000,
        "valueY": 4,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585798440000,
        "valueY": 4,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585798500000,
        "valueY": 3,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585798560000,
        "valueY": 4,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585798620000,
        "valueY": 1,
        "type": "DB_EVENT"
      },
      {
        "timeX": 1585798620000,
        "valueY": 5,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585798680000,
        "valueY": 3,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585798740000,
        "valueY": 4,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585798800000,
        "valueY": 3,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585798860000,
        "valueY": 3,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585798920000,
        "valueY": 3,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585798980000,
        "valueY": 1,
        "type": "DB_EVENT"
      },
      {
        "timeX": 1585798980000,
        "valueY": 4,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585799040000,
        "valueY": 3,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585799100000,
        "valueY": 4,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585799160000,
        "valueY": 1,
        "type": "DB_EVENT"
      },
      {
        "timeX": 1585799160000,
        "valueY": 5,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585799220000,
        "valueY": 5,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585799280000,
        "valueY": 3,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585799340000,
        "valueY": 4,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585799400000,
        "valueY": 3,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585799460000,
        "valueY": 5,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585799520000,
        "valueY": 3,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585799580000,
        "valueY": 3,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585799640000,
        "valueY": 3,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585799700000,
        "valueY": 1,
        "type": "DB_EVENT"
      },
      {
        "timeX": 1585799700000,
        "valueY": 4,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585799760000,
        "valueY": 4,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585799820000,
        "valueY": 5,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585799880000,
        "valueY": 26,
        "type": "DB_EVENT"
      },
      {
        "timeX": 1585799880000,
        "valueY": 3,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585799940000,
        "valueY": 3,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585800000000,
        "valueY": 1,
        "type": "RISK_EVENT"
      },
      {
        "timeX": 1585800000000,
        "valueY": 4,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585800060000,
        "valueY": 5,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585800120000,
        "valueY": 3,
        "type": "ALARM_EVENT"
      },
      {
        "timeX": 1585800180000,
        "valueY": 4,
        "type": "ALARM_EVENT"
      }
    ];

    const EVENT_MAP_NEW = {
      OPS_EVENT: '运维事件',
      ALARM_EVENT: '告警事件',
      RISK_EVENT: '风险事件',
      DB_EVENT: 'DB事件',
      FAULT_MACHINE_EVENT: '故障机事件',
      INFRASTRUCTURE_EVENT: '基础设施事件',
    };
    // Step 1: 创建 Chart 对象
    const chart = new Chart({
      container: createDiv(), // 指定图表容器 ID
      height: 300, // 指定图表高度
      width: 600,
    });
    chart.scale('timeX', { type: 'time', mask: 'HH:mm' });
    chart.scale('type', {
      formatter(type) {
        return EVENT_MAP_NEW[type];
      },
    });
    chart.tooltip({
      shared: true,
      itemTpl:
        '<li style="padding-bottom: 14px;">' +
        '<span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>' +
        '{typeShow}: {valueY}' +
        `<a style="margin-left:10px;" data-handler="true" data-time="{timeX}" data-type="{type}">详情</a>` +
        '</li>',
    });
    chart.animate(false);
    chart.data(data);
    chart
      .interval()
      .adjust('stack')
      .position('timeX*valueY')
      .tooltip('type*valueY*timeX', (type, valueY, timeX) => ({
        typeShow: EVENT_MAP_NEW[type],
        type,
        valueY,
        timeX,
      }))
      .color('type', type => {
        return (
          {
            ALARM_EVENT: '#F66',
            DB_EVENT: '#5AD8A6',
            FAULT_MACHINE_EVENT: '#F6BD16',
            RISK_EVENT: '#5D7092',
            OPS_EVENT: '#0099FF',
          }[type] || '#7584a2'
        );
      });
    chart.render();

    const tooltipItems = chart.getTooltipItems({
      x: 264,
      y: 252,
    });
    expect(tooltipItems.length).toBe(2);
  });
});
