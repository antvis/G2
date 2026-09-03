/**
 * A recreation of this demo: https://observablehq.com/@d3/candlestick-chart
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

// For LegendFilter.
chart.options({
  type: 'view',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/aapl2.json',
    transform: [
      {
        type: 'map',
        callback: (d) => ({
          ...d,
          Date: new Date(d.Date),
        }),
      },
    ],
  },
  scale: {
    color: {
      domain: [1, 0, -1],
      range: ['#4daf4a', '#999999', '#e41a1c'],
    },
  },
  interaction: {
    tooltip: { shared: true, groupName: false },
  },
  children: [
    {
      type: 'link',
      encode: {
        x: 'Date',
        y: ['Low', 'High'],
        color: (d) => Math.sign(d.Close - d.Open),
      },
      style: {
        stroke: 'black',
      },
      tooltip: {
        title: (d) => d.Date.toLocaleString(),
        items: [
          { field: 'Low', name: 'low' },
          { field: 'High', name: 'high' },
        ],
      },
    },
    {
      type: 'link',
      encode: {
        x: 'Date',
        y: ['Open', 'Close'],
        color: (d) => Math.sign(d.Close - d.Open),
      },
      style: {
        radius: 2,
        fillOpacity: 1,
        lineWidth: 4,
        lineCap: 'round',
      },
      tooltip: {
        title: '',
        items: [
          { field: 'Open', name: 'open' },
          { field: 'Close', name: 'close' },
        ],
      },
    },
  ],
});

chart.render();
