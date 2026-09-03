/**
 * A recreation of this demo: https://nivo.rocks/storybook/?path=/docs/bar--diverging-stacked
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  paddingLeft: 25,
});

chart.options({
  type: 'view',
  children: [
    {
      type: 'interval',
      data: {
        type: 'fetch',
        value: 'https://assets.antv.antgroup.com/g2/nivo-gain-lost.json',
        transform: [
          {
            type: 'fold',
            fields: [
              'lost > 100$',
              'lost <= 100$',
              'gained <= 100$',
              'gained > 100$',
            ],
          },
        ],
      },
      transform: [{ type: 'stackY' }],
      encode: {
        x: 'user',
        y: 'value',
        color: 'key',
      },
      scale: {
        x: { padding: 0.2 },
        y: { domainMin: -100, domainMax: 100 },
        color: {
          domain: [
            'lost > 100$',
            'lost <= 100$',
            'gained <= 100$',
            'gained > 100$',
          ],
          range: ['#97e3d5', '#61cdbb', '#e25c3b', '#f47560'],
        },
      },
      legend: { color: { title: false } },
      labels: [
        {
          text: 'value',
          position: 'inside',
          formatter: (v) => (v ? `${v}%` : ''),
          transform: [{ type: 'overlapDodgeY' }],
          fill: '#000',
          fontSize: 10,
        },
      ],
      axis: {
        y: {
          position: 'right',
          title: false,
          labelFormatter: (v) => `${v}%`,
        },
      },
      style: { radius: 10 },
    },
    {
      type: 'lineY',
      data: [0],
      style: {
        lineWidth: 2,
        stroke: '#e25c3b',
        strokeOpacity: 1,
      },
    },
    titleLeft('75%', 'lost', '#61cdbb'),
    titleLeft('20%', 'gain', '#e25c3b'),
  ],
});

function titleLeft(y, text, fill) {
  return {
    type: 'text',
    style: {
      x: -10,
      y,
      text,
      fontWeight: 'bold',
      dy: -10,
      transform: 'rotate(-90)',
      fill,
    },
  };
}

chart.render();
