/**
 * A recreation of this demo: http://benfred.github.io/venn.js/examples/intersection_tooltip.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  autoFit: true,
  paddingLeft: 50,
  paddingRight: 50,
});

chart
  .path()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/lastfm.json',
    transform: [
      {
        type: 'venn',
        padding: 8,
        sets: 'sets',
        size: 'size',
        as: ['key', 'path'],
      },
    ],
  })
  .encode('d', 'path')
  .encode('color', 'key')
  .label({
    position: 'inside',
    text: (d) => d.label || '',
    transform: [{ type: 'contrastReverse' }],
  })
  .style('opacity', 0.4)
  .legend(false)
  .tooltip({ title: { channel: 'label', valueFormatter: '.1f' } });

chart.render();
