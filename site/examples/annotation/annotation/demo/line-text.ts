import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/antvdemo/assets/data/blockchain.json',
    transform: [
      {
        type: 'fold',
        fields: ['blockchain', 'nlp'],
        key: 'type',
        value: 'value',
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
  .style({
    text: `2017-12-17, 受比特币影响，blockchain 搜索热度达到峰值：100`,
    wordWrap: true,
    wordWrapWidth: 164,
    dx: -174,
    dy: 30,
    fill: '#2C3542',
    fillOpacity: 0.65,
    fontSize: 10,
    background: true,
    backgroundRadius: 2,
    connector: true,
    startMarker: true,
    startMarkerFill: '#2C3542',
    startMarkerFillOpacity: 0.65,
  })
  .tooltip(false);

chart.render();
