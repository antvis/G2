/**
 * A recreation of this demo: https://nivo.rocks/pie/
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 500,
  height: 400,
});

// Apply dark theme.
chart.options({
  type: 'view',
  theme: {
    type: 'classicDark',
    view: {
      viewFill: '#141414',
    },
  },
  coordinate: { type: 'theta', innerRadius: 0.25, outerRadius: 0.8 },
  children: [
    {
      type: 'interval',
      data: [
        { id: 'c', value: 526 },
        { id: 'sass', value: 220 },
        { id: 'php', value: 325 },
        { id: 'elixir', value: 561 },
        { id: 'rust', value: 54 },
      ],
      transform: [{ type: 'stackY' }],
      encode: {
        y: 'value',
        color: 'id',
      },
      labels: [
        {
          text: 'value',
          offset: 14,
          fontWeight: 'bold',
        },
        {
          text: 'id',
          position: 'spider',
          connectorDistance: 0,
          fontWeight: 'bold',
          textBaseline: 'bottom',
          textAlign: (d) => (['c', 'sass'].includes(d.id) ? 'end' : 'start'),
          dy: -4,
        },
      ],
      style: {
        radius: 4,
        inset: 1,
      },
      animate: {
        enter: { type: 'waveIn', duration: 1000 },
      },
      legend: false,
    },
  ],
});

chart.render();
