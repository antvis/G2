import DataSet from '@antv/data-set';
import { Chart } from '../../src';
import Unchecked from '../../src/interaction/action/component/list-unchecked';
import Filter from '../../src/interaction/action/data/filter';
import { createDiv } from '../util/dom';

import Context from '../../src/interaction/context';

describe('multiple view legend', () => {
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
    width: 500,
    height: 400,
    padding: 0,
  });

  chart.scale('Date', {
    range: [0, 1],
    tickCount: 10,
    type: 'timeCat',
    mask: 'MM-DD',
  });
  chart.removeInteraction('legend-filter');
  chart.animate(false);
  // chart.scale('type', {
  //    sync: true
  // });
  chart.axis('Date', {
    label: {
      style: {
        fill: '#aaaaaa',
      },
    },
  });
  chart.axis('value', {
    label: {
      formatter: (text) => {
        return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
      },
    },
  });
  chart.tooltip({
    showCrosshairs: true,
    shared: true,
  });

  data.forEach(row => {
    row['range'] = [row.订阅数, row.月收入];
  });
  const view1 = chart.createView({
    padding: [8, 8, 48, 64],
  });
  view1.data(data);
  view1.axis(false);
  view1.tooltip(false);
  view1
    .area()
    .position('Date*range')
    .color('#8d8d8d')
    .style({
      fillOpacity: 0.1,
    });

  const ds = new DataSet();
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
    padding: [8, 8, 48, 64],
  });
  view2.data(dv2.rows);
  const lineGeom = view2
    .line()
    .position('Date*value')
    .color('type');
  view2
    .point()
    .position('Date*value')
    .color('type')
    .shape('circle');

  chart.render();
  const context = new Context(chart);
  const action = new Unchecked(context);
  const filter = new Filter(context);
  it('unchecked', () => {
    const legendItems = chart.foregroundGroup.findAll((el) => {
      return el.get('name') === 'legend-item';
    });
    context.event = {
      target: legendItems[0]
    }
    action.unchecked();
    filter.filter();
    expect(lineGeom.elements.length).toBe(1);
    action.clear();
    filter.filter();
    expect(lineGeom.elements.length).toBe(2);
  });
  afterAll(() => {
    chart.destroy();
    context.destroy();
  });
});
