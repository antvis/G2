import { Chart } from '../../src';
import { createDiv } from '../util/dom';
import { flatten } from '@antv/util';
import IntervalLabel from '../../src/geometry/label/interval';

describe('pyramid funnel ', () => {
  it('should render label middle', () => {
    const data = [
      { action: '浏览网站', pv: 50000 },
      { action: '放入购物车', pv: 35000 },
      { action: '生成订单', pv: 25000 },
      { action: '支付订单', pv: 15000 },
      { action: '完成交易', pv: 10000 },
    ];

    const chart = new Chart({
      container: createDiv(),
      width: 600,
      height: 500,
      padding: [20, 120, 95],
    });
    chart.data(data);
    chart.axis(false);
    chart.coordinate('rect').transpose().scale(1, -1);

    const interval = chart
      .interval()
      .adjust('symmetric')
      .position('action*pv')
      .shape('pyramid')
      .color('action', ['#0050B3', '#1890FF', '#40A9FF', '#69C0FF', '#BAE7FF'])
      .label('action*pv', {
        position: 'middle',
        labelLine: {
          style: {
            lineWidth: 1,
            stroke: 'rgba(0, 0, 0, 0.15)',
          },
        },
      });

    chart.render();

    // 生成映射数据
    // @ts-ignore
    const beforeMappingData = interval.beforeMappingData;
    // @ts-ignore
    const dataArray = interval.beforeMapping(beforeMappingData);

    // @ts-ignore
    const mappingArray = flatten(dataArray.map((d) => interval.mapping(d)));
    const gLabels = new IntervalLabel(interval);
    // @ts-ignore
    const labelItems = gLabels.getLabelItems(mappingArray);

    expect(labelItems[0].x).toBe(300);
    expect(labelItems[0].y).toBe(58.5);
    expect(labelItems[2].x).toBe(300);
    expect(labelItems[2].y).toBe(212.5);
    expect(labelItems[4].x).toBe(300);
    expect(labelItems[4].y).toBe(366.5);

    chart.destroy();
  });
});
