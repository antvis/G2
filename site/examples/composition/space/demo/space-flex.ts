import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 900,
});

chart.options({
  type: 'spaceFlex',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/seattle-weather.json',
  },
  direction: 'col',
  ratio: [1, 2],
  children: [
    {
      type: 'interval',
      paddingBottom: 0,
      paddingRight: 300,
      transform: [{ type: 'groupX', y: 'max' }],
      axis: { x: false },
      encode: {
        x: (d) => new Date(d.date).getUTCDate(),
        y: 'temp_max',
        color: 'steelblue',
      },
    },
    {
      type: 'spaceFlex',
      ratio: [2, 1],
      paddingBottom: 60,
      children: [
        {
          type: 'cell',
          paddingRight: 0,
          paddingBottom: 60,
          transform: [{ type: 'group', color: 'max' }],
          encode: {
            x: (d) => new Date(d.date).getUTCDate(),
            y: (d) => new Date(d.date).getUTCMonth(),
            color: 'temp_max',
          },
          style: { inset: 0.5 },
          axis: {
            x: { title: 'Date' },
            y: { title: 'Month' },
          },
          legend: { color: false },
          scale: { color: { palette: 'gnBu' } },
        },
        {
          type: 'interval',
          coordinate: { transform: [{ type: 'transpose' }] },
          transform: [{ type: 'groupX', y: 'max' }],
          axis: { x: false },
          encode: {
            x: (d) => new Date(d.date).getUTCMonth(),
            y: 'temp_max',
            color: 'steelblue',
          },
        },
      ],
    },
  ],
});

chart.render();
