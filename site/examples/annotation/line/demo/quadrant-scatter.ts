import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/0b37279d-1674-42b4-b285-29683747ad9a.json',
    transform: [
      { type: 'filter', callback: (d) => d['change in male rate'] !== 'NA' },
    ],
  },
  children: [
    {
      type: 'lineX',
      data: [0],
    },
    {
      type: 'lineY',
      data: [0],
    },
    {
      type: 'range',
      data: [
        { x: [-25, 0], y: [-30, 0], region: '1' },
        { x: [-25, 0], y: [0, 20], region: '2' },
        { x: [0, 5], y: [-30, 0], region: '2' },
        { x: [0, 5], y: [0, 20], region: '1' },
      ],
      encode: {
        x: 'x',
        y: 'y',
      },
      style: {
        fill: (d) => (d.region === '1' ? '#d8d0c0' : '#a3dda1'),
        fillOpacity: 0.2,
      },
      animate: {
        enter: { type: 'fadeIn' },
      },
    },
    {
      type: 'point',
      encode: {
        x: 'change in female rate',
        y: 'change in male rate',
        size: 'pop',
        color: 'continent',
        shape: 'point',
      },
      scale: {
        color: {
          range: ['#ffd500', '#82cab2', '#193442', '#d18768', '#7e827a'],
        },
        size: { range: [4, 30] },
      },
      style: {
        stroke: '#bbb',
        fillOpacity: 0.8,
      },
      axis: {
        x: { title: 'Female' },
        y: { title: 'Male' },
      },
      legend: {
        size: false,
      },
      slider: {
        x: { labelFormatter: (d) => d.toFixed(1) },
        y: { labelFormatter: (d) => d.toFixed(1) },
      },
      tooltip: {
        items: [
          { channel: 'x', valueFormatter: '.1f' },
          { channel: 'y', valueFormatter: '.1f' },
        ],
      },
    },
  ],
});

chart.render();
