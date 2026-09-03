import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  interaction: {
    chartIndex: {
      ruleStroke: '#aaa',
      labelDx: 5,
      labelTextAlign: 'center',
      labelStroke: '#fff',
      labelLineWidth: 5,
      labelFormatter: (d) => `${d.toLocaleDateString()}`,
    },
    tooltip: false,
  },
  children: [
    {
      type: 'line',
      data: {
        type: 'fetch',
        value: 'https://assets.antv.antgroup.com/g2/indices.json',
      },
      encode: {
        x: (d) => new Date(d.Date),
        y: 'Close',
        color: 'Symbol',
        key: 'Symbol',
        title: (d) => d.Date.toLocaleString(),
      },
      axis: {
        y: { title: '↑ Change in price (%)', labelAutoRotate: false },
      },
      scale: {
        y: { type: 'log' },
      },
      labels: [
        {
          text: 'Symbol',
          selector: 'last',
          fontSize: 10,
        },
      ],
    },
  ],
});

chart.render();
