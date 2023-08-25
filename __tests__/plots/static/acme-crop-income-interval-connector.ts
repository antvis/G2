import { acmeCropIncome } from '../../data/acmeCropIncome';

export function acmeCropIncomeIntervalConnector() {
  const linkData = (data) =>
    data.reduce((r, d, idx) => {
      if (idx > 0) {
        return r.concat({
          x1: data[idx - 1].x,
          x2: d.x,
          value: d.isTotal ? d.end : d.start,
        });
      }
      return r;
    }, []);
  const connectorData = (data) => [
    {
      x1: data[0].x,
      y1: data[0].end,
      x2: data[data.length - 1].x,
      y2: data[data.length - 1].end,
    },
  ];

  return {
    type: 'view',
    paddingTop: 40,
    data: acmeCropIncome,
    axis: {
      x: { labelTransform: 'rotate(-90)' },
      y: { labelFormatter: '~s' },
    },
    legend: false,
    children: [
      {
        type: 'link',
        data: { transform: [{ type: 'custom', callback: linkData }] },
        encode: { x: ['x1', 'x2'], y: ['value'] },
        style: { stroke: '#697474', lineDash: [4, 2] },
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
        style: {
          stroke: '#697474',
          offset: 16,
        },
      },
      {
        type: 'interval',
        encode: {
          x: 'x',
          y: ['start', 'end'],
          color: (d, idx) =>
            idx === 0 || d.isTotal ? 'D' : d.value > 0 ? 'P' : 'N',
        },
        scale: {
          color: {
            domain: ['P', 'N', 'D'],
            range: ['#64b5f6', '#ef6c00', '#96a6a6'],
          },
          x: {
            padding: 0.5,
          },
        },
        style: { stroke: '#697474' },
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
      },
    ],
  };
}
