import { Chart } from '../../../src';
import indices from '../../data/indices.json';

export function issue6020(context) {
  const { container, canvas } = context;

  const chart = new Chart({
    container: container,
    autoFit: true,
    insetRight: 10,
    canvas,
  });

  let i = 0;

  chart
    .line()
    .data({
      value: indices,
    })
    .transform({ type: 'normalizeY', basis: 'first', groupBy: 'color' })
    .encode('x', (d) => new Date(d.Date))
    .encode('y', 'Close')
    .encode('color', 'Symbol')
    .scale('y', { type: 'log' })
    .axis('y', { title: '↑ Change in price (%)' })
    .label({
      text: 'Symbol',
      selector: (data) => {
        if (data.length) {
          // 对于每个系列的数据，只保留索引等于 2 的标签
          return data.filter((d, index) => index === 2);
        }
        return data;
      },
      fontSize: 10,
    })
    .tooltip({ channel: 'y', valueFormatter: '.1f' });

  chart.render().then(() => {
    console.log(i);
    i = 0;
  });

  return { chart };
}
