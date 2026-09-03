import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 300,
  height: 720,
  paddingLeft: 60,
  paddingBottom: 60,
});

chart.options({
  type: 'repeatMatrix',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/weather.json',
    transform: [
      {
        type: 'map',
        callback: ({ date, ...d }) => ({
          ...d,
          date: new Date(date).getMonth() + '',
        }),
      },
    ],
  },
  encode: {
    y: ['temp_max', 'precipitation', 'wind'],
    x: 'date',
  },
  children: [
    {
      type: 'line',
      transform: [{ type: 'groupX', y: 'mean' }],
      encode: {
        color: 'location',
      },
      scale: {
        y: { zero: true },
      },
    },
  ],
});

chart.render();
