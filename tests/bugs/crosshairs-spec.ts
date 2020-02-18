import DataSet from '@antv/data-set';
import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('Crosshairs', () => {
  it('views', () => {
    const data = [
      { Date: '22 February', 订阅数: 50000, 月收入: 125000 },
      { Date: '28 February', 订阅数: 60000, 月收入: 150000 },
      { Date: '3 March', 订阅数: 100000, 月收入: 250000 },
      { Date: '20 March', 订阅数: 200000, 月收入: 500000 },
      { Date: '7 April', 订阅数: 250000, 月收入: 625000 },
      { Date: '13 June', 订阅数: 210000, 月收入: 525000 },
    ];

    const chart = new Chart({
      container: createDiv(),
      width: 400,
      height: 300,
      padding: 0,
      // padding: [8, 8, 48, 64],
    });

    chart.tooltip({
      showCrosshairs: true,
      shared: true,
      crosshairs: {
        text: {},
      }
    });

    const ds = new DataSet();

    // view1
    const dv = ds
      .createView()
      .source(data)
      .transform({
        type: 'map',
        callback(row) {
          row.range = [row.订阅数, row.月收入];
          return row;
        },
      });
    const view1 = chart.createView({
      // padding: 0,
      padding: [30, 8, 48, 64],
    });
    view1.data(dv.rows);
    view1.axis(false);
    view1.tooltip(false);
    view1
      .area()
      .position('Date*range')
      .color('#8d8d8d')
      .style({
        fillOpacity: 0.1,
      });

    // view2
    const dv2 = ds
      .createView()
      .source(data)
      .transform({
        type: 'fold',
        fields: ['订阅数', '月收入'],
        key: 'type',
        value: 'value',
        retains: ['Date'],
      });
    const view2 = chart.createView({
      // padding: 0,
      padding: [30, 8, 48, 64],
    });
    view2.data(dv2.rows);
    view2
      .line()
      .position('Date*value')
      .color('type');
    view2
      .point()
      .position('Date*value')
      .color('type')
      .shape('circle');

    chart.render();

    const point = view2.getXY({Date: "28 February", type: "月收入", value: 150000});
    chart.showTooltip(point);

    const tooltip = chart.getController('tooltip');
    // @ts-ignore
    const xCrosshairs = tooltip.xCrosshair;
    expect(xCrosshairs.get('group').getCount()).toBe(3);
    expect(xCrosshairs.get('group').getChildren()[1].getBBox().height).toBe(view2.getCoordinate().getHeight() + 1);
    expect(xCrosshairs.get('group').getChildren()[2].attr('text')).toBe('28 February');
  });
});
