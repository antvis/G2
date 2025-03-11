/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/layer_histogram_global_mean.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.data({
  type: 'fetch',
  value: 'https://assets.antv.antgroup.com/g2/movies.json',
  transform: [
    {
      type: 'filter',
      callback: (d) => d['IMDB Rating'] > 0,
    },
  ],
});

chart
  .rect()
  .transform({ type: 'binX', y: 'count', thresholds: 9 })
  .encode('x', 'IMDB Rating')
  .scale('y', { domainMax: 1000 })
  .style('inset', 1);

chart
  .lineX()
  .transform({ type: 'groupColor', x: 'mean' }) // groupColor 为分组并对指定的通道进行聚合，可以理解为把数据通过 x 通道的数据 取平均值(mean) 变更为一条数据。
  .encode('x', 'IMDB Rating')
  .style('stroke', '#F4664A')
  .style('strokeOpacity', 1)
  .style('lineWidth', 2)
  .style('lineDash', [4, 4]);

chart.render();
