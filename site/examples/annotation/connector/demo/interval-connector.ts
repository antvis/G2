/**
 * A recreation of this demo: https://www.anychart.com/products/anychart/gallery/Waterfall_Charts/Waterfall_Arrows.php
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
  insetTop: 30,
});

chart.options({
  type: 'view',
  data: [
    { x: 'Net Sales', value: 5085000, start: 0, end: 5085000 },
    { x: 'Cost of Sales', value: -1250450, start: 5085000, end: 3834550 },
    { x: 'Operating Expenses', value: -2350050, start: 3834550, end: 1484500 },
    { x: 'Other Income', value: 750000, start: 1484500, end: 2234500 },
    { x: 'Extraordinary Gain', value: -230050, start: 2234500, end: 2004450 },
    { x: 'Interest Expense', value: -500000, start: 2004450, end: 1504450 },
    { x: 'Taxes', value: 490000, start: 1504450, end: 1994450 },
    { x: 'Net Income', isTotal: true, value: 1994450, start: 0, end: 1994450 },
  ],
  axis: {
    x: { title: false, labelTransform: 'rotate(-90)' },
    y: { labelFormatter: '~s' },
  },
  legend: null,
  children: [
    {
      type: 'link',
      data: { transform: [{ type: 'custom', callback: linkData }] },
      encode: {
        x: ['x1', 'x2'],
        y: 'value',
      },
      style: {
        stroke: '#697474',
        lineDash: [4, 2],
      },
      tooltip: false,
    },
    {
      type: 'connector',
      data: { transform: [{ type: 'custom', callback: connectorData }] },
      encode: {
        x: ['x1', 'x2'],
        y: ['y1', 'y2'],
      },
      labels: [
        {
          text: (d) => `${d.y2 - d.y1}`,
          formatter: '~s',
          fontSize: 10,
          dy: 2,
        },
      ],
      style: { stroke: '#697474', offset: 16 },
      tooltip: false,
    },
    {
      type: 'interval',
      encode: {
        x: 'x',
        y: ['start', 'end'],
        color: (d, idx) =>
          idx === 0 || d.isTotal ? 'D' : d.value > 0 ? 'P' : 'N',
        size: 24,
      },
      scale: {
        color: {
          domain: ['P', 'N', 'D'],
          range: ['#64b5f6', '#ef6c00', '#96a6a6'],
        },
      },
      style: {
        stroke: '#697474',
      },
      labels: [
        {
          text: 'value',
          formatter: '~s',
          position: (d) => (d.value > 0 ? 'top' : 'bottom'),
          textBaseline: (d) => (d.value > 0 ? 'bottom' : 'top'),
          fontSize: 10,
          dy: (d) => (d.value > 0 ? -4 : 4),
        },
      ],
      tooltip: {
        items: [
          { channel: 'y', valueFormatter: '~s' },
          { channel: 'y1', valueFormatter: '~s' },
        ],
      },
    },
  ],
});

chart.render();

// Process data.
function linkData(data) {
  return data.reduce((r, d, idx) => {
    if (idx > 0) {
      return r.concat({
        x1: data[idx - 1].x,
        x2: d.x,
        value: d.isTotal ? d.end : d.start,
      });
    }
    return r;
  }, []);
}

function connectorData(data) {
  return [
    {
      x1: data[0].x,
      y1: data[0].end,
      x2: data[data.length - 1].x,
      y2: data[data.length - 1].end,
    },
  ];
}
