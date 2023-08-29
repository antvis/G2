import { G2Spec } from '../../../src';

export function alphabetIntervalFunnelConnectorLabel(): G2Spec {
  const data = [
    { text: 'A', value: 12000 },
    { text: 'B', value: 9800 },
    { text: 'C', value: 6789 },
    { text: 'D', value: 4569 },
  ];
  const encodeX = 'text';
  const encodeY = 'value';
  const r = (start, end) => `${(((start - end) / start) * 100).toFixed(2)} %`;
  return {
    type: 'view',
    paddingRight: 60,
    coordinate: { transform: [{ type: 'transpose' }] },
    children: [
      {
        type: 'interval',
        data,
        transform: [{ type: 'symmetryY' }],
        axis: false,
        legend: false,
        encode: {
          x: encodeX,
          y: encodeY,
          color: encodeX,
          shape: 'funnel',
        },
        scale: { x: { paddingOuter: 0, paddingInner: 0 } },
        labels: [
          {
            text: (d) => `${d[encodeX]} ${d[encodeY]}`,
            position: 'inside',
            fontSize: 20,
          },
          {
            text: '',
            render: (d, data, i) =>
              i !== 0
                ? `<div style="height:1px;width:30px;background:#aaa;margin:0 5px;"></div>`
                : '',
            position: 'top-right',
          },
          {
            text: (d, i) => (i !== 0 ? 'Percentage' : ''),
            position: 'top-right',
            textAlign: 'left',
            textBaseline: 'middle',
            fill: '#aaa',
            dx: 40,
          },
          {
            text: (d, i, data) =>
              i !== 0 ? r(data[i - 1][encodeY], data[i][encodeY]) : '',
            position: 'top-right',
            textAlign: 'left',
            textBaseline: 'middle',
            dx: 40,
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
            text: 'Percentage',
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
  };
}
