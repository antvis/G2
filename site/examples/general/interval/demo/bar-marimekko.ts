/**
 * A recreation of this demo: https://observablehq.com/@d3/marimekko-chart
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 900,
  height: 800,
  paddingLeft: 0,
  paddingRight: 0,
});

chart.options({
  type: 'view',
  children: [
    {
      type: 'interval',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/bmw-prod/3041da62-1bf4-4849-aac3-01a387544bf4.csv',
      },
      transform: [
        { type: 'flexX', reducer: 'sum' },
        { type: 'stackY' },
        { type: 'normalizeY' },
      ],
      encode: {
        x: 'market',
        y: 'value',
        color: 'segment',
      },
      axis: {
        y: false,
      },
      scale: {
        x: { paddingOuter: 0, paddingInner: 0.01 },
      },
      tooltip: {
        items: ['value'],
      },
      labels: [
        {
          text: 'segment',
          x: 5,
          y: 5,
          textAlign: 'start',
          textBaseline: 'top',
          fontSize: 10,
          fill: '#fff',
        },
        {
          text: 'value',
          x: 5,
          y: 5,
          textAlign: 'start',
          dy: 15,
          fontSize: 10,
          fill: '#fff',
        },
      ],
    },
  ],
});

chart.render();
