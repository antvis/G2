import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  children: [
    {
      type: 'partition',
      data: {
        type: 'fetch',
        value:
          'https://raw.githubusercontent.com/antvis/G2/refs/heads/v5/__tests__/data/partition.json',
      },
      encode: {
        value: 'value',
        color: 'name',
      },
      layout: {
        sort: (a, b) => b.value - a.value,
      },
      scale: {
        color: {
          range: [
            'rgb(236, 160, 57)',
            'rgb(196, 68, 57)',
            'rgb(211, 180, 60)',
            'rgb(230, 67, 63)',
          ],
        },
      },
      labels: [
        {
          text: 'name',
          position: 'left',
          dx: 8,
          transform: [
            {
              type: 'overflowHide',
            },
          ],
        },
      ],
      style: {
        inset: 0.5,
      },
      axis: {
        x: {
          title: 'Time/Order',
        },
      },
    },
  ],
});

chart.render();
