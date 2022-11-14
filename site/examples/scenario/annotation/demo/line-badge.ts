import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container', autoFit: true });

chart
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/antvdemo/assets/data/blockchain.json',
    transform: [
      {
        type: 'fold',
        fields: ['blockchain', 'nlp'],
        as: ['type', 'value'],
      },
    ],
  })
  .axis('x', { labelAutoHide: 'greedy' });

chart
  .line()
  .encode('x', (d) => new Date(d.date))
  .encode('y', 'value')
  .encode('color', 'type');

chart
  .text()
  .data([new Date('2017-12-17'), 100])
  .encode('shape', 'badge')
  .style({
    text: '100',
    dy: -1,
    markerSize: 24,
    markerFill: '#6395FA',
    markerFillOpacity: 0.55,
  });

chart.render();
