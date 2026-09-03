import { Chart } from '@antv/g2';

const r = (start, end) => `${(((start - end) / start) * 100).toFixed(2)} %`;

const data = [
  { text: 'A', value: 12000 },
  { text: 'B', value: 9800 },
  { text: 'C', value: 6789 },
  { text: 'D', value: 4569 },
];
const encodeX = 'text';
const encodeY = 'value';

const chart = new Chart({
  container: 'container',
  autoFit: true,
  paddingRight: 60,
});

chart.options({
  type: 'view',
  coordinate: {
    transform: [{ type: 'transpose' }],
  },
  children: [
    {
      type: 'interval',
      data: data,
      transform: [{ type: 'symmetryY' }],
      axis: false,
      legend: false,
      encode: {
        x: encodeX,
        y: encodeY,
        color: encodeX,
        shape: 'funnel',
      },
      scale: {
        x: { paddingOuter: 0, paddingInner: 0 },
      },
      labels: [
        {
          text: (d) => `${d[encodeX]} ${d[encodeY]}`,
          position: 'inside',
          fontSize: 20,
        },
        {
          text: '',
          // Use div to mock a line.
          render: (d, data, i) =>
            i !== 0
              ? `<div style="height:1px;width:30px;background:#aaa;margin:0 20px;"></div>`
              : '',
          position: 'top-right',
        },
        {
          text: (d, i) => (i !== 0 ? '转换率' : ''),
          position: 'top-right',
          textAlign: 'left',
          textBaseline: 'middle',
          fill: '#aaa',
          dx: 60,
        },
        {
          text: (d, i, data) =>
            i !== 0 ? r(data[i - 1][encodeY], data[i][encodeY]) : '',
          position: 'top-right',
          textAlign: 'left',
          textBaseline: 'middle',
          dx: 60,
          dy: 15,
        },
      ],
    },
    {
      type: 'connector',
      data: [
        {
          startX: data[0][encodeX],
          startY: data[data.length - 1][encodeX],
          endX: 0,
          endY: (data[0][encodeY] - data[data.length - 1][encodeY]) / 2,
        },
      ],
      encode: {
        x: 'startX',
        x1: 'startY',
        y: 'endX',
        y1: 'endY',
      },
      labels: [
        {
          text: '转换率',
          position: 'left',
          textAlign: 'start',
          textBaseline: 'middle',
          fill: '#aaa',
          dx: 10,
        },
        {
          text: r(data[0][encodeY], data[data.length - 1][encodeY]),
          position: 'left',
          textAlign: 'start',
          dy: 15,
          dx: 10,
          fill: '#000',
        },
      ],
      style: {
        stroke: '#aaa',
        markerEnd: false,
        connectLength1: -12,
        offset2: -20,
      },
    },
  ],
});

chart.render();
