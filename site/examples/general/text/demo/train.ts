import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 600,
  height: 300,
  paddingLeft: 48,
});

const X = new Array(21).fill(0).map((_, idx) => idx + 4);
const Y = [-3, -2, -1, 0, 1, 2, 3];

// Time axis

// South / North label

// NLB
chart.options({
  type: 'view',
  children: [
    {
      type: 'text',
      data: X.slice(1),
      encode: {
        x: (v) => v,
        y: 0,
        text: (v) => (v < 12 ? `${v}a` : `${v - 12}p`),
      },
      scale: {
        x: { domain: X },
        y: { domain: Y },
      },
      style: {
        fill: 'grey',
      },
      axis: false,
    },
    {
      type: 'text',
      data: ['South', 'North'],
      encode: {
        x: 4,
        y: (_, idx) => (idx == 0 ? -1 : 1),
        text: (t) => t,
      },
      scale: {
        x: { domain: X },
        y: { domain: Y },
      },
      style: {
        textAlign: 'right',
      },
      axis: false,
    },
    {
      type: 'text',
      data: {
        type: 'fetch',
        value: 'https://assets.antv.antgroup.com/g2/caltrain.json',
      },
      transform: [{ type: 'stackY' }],
      encode: {
        x: (d) => Number(d.hours),
        y: (d) => (d.orientation === 'S' ? -1 : 1),
        color: 'type',
        text: (d) => d.minutes.padStart(2, '0'),
      },
      scale: {
        x: { domain: X },
        y: { domain: Y },
        color: { range: ['currentColor', 'peru', 'brown'] },
      },
      style: {
        stroke: 'transparent',
      },
    },
  ],
});

chart.render();
