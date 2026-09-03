import { Chart } from '@antv/g2';

const data = [
  264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513,
  546, 983, 340, 539, 243, 226, 192,
];

const chart = new Chart({
  container: 'container',
  width: 480,
  height: 80,
});

chart.options({
  type: 'view',
  data: data,
  interaction: {
    tooltip: {
      render: (e, { title, items }) => items[0].value,
    },
  },
  children: [
    {
      type: 'interval',
      encode: {
        x: (_, idx) => idx,
        y: (d) => d,
      },
      axis: false,
    },
    {
      type: 'lineY',
      data: [700],
      style: {
        stroke: 'red',
        lineDash: [2, 2],
        arrow: true,
      },
      labels: [
        {
          text: 'value = 700',
          position: 'right',
          dx: -10,
          textBaseline: 'bottom',
        },
      ],
    },
  ],
});

chart.render();
