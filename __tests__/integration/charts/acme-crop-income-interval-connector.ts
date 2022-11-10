import { acmeCropIncome } from '../data/acmeCropIncome';

export function acmeCropIncomeIntervalConnector() {
  return {
    type: 'view',
    paddingBottom: 100,
    paddingLeft: 60,
    paddingTop: 40,
    data: {
      value: acmeCropIncome,
      transform: [
        {
          type: 'custom',
          callback: (data) =>
            data.reduce((r, d) => {
              const prev = r[r.length - 1];
              const v1 = prev ? prev.end : 0;
              const v2 = (prev ? prev.end : 0) + d.value;
              const total = prev ? prev.end : 0;
              return r.concat({
                ...d,
                value: d.isTotal ? total : d.value,
                start: d.isTotal ? 0 : v1,
                end: d.isTotal ? total : v2,
              });
            }, []),
        },
      ],
    },
    axis: { x: { title: false, labelRotate: -90 }, y: { tickFormatter: '~s' } },
    legend: false,
    children: [
      {
        type: 'link',
        data: {
          transform: [
            {
              type: 'custom',
              callback: (data) =>
                data.reduce((r, d, idx) => {
                  if (idx > 0) {
                    return r.concat({
                      x1: data[idx - 1].x,
                      x2: d.x,
                      value: d.isTotal ? d.end : d.start,
                    });
                  }
                  return r;
                }, []),
            },
          ],
        },
        encode: { x: ['x1', 'x2'], y: ['value'] },
        style: { stroke: '#697474', lineDash: [4, 2] },
      },
      {
        type: 'connector',
        data: {
          transform: [
            {
              type: 'custom',
              callback: (data) => {
                const first = data[0];
                const last = data[data.length - 1];
                return [
                  { x1: first.x, y1: first.end, x2: last.x, y2: last.end },
                ];
              },
            },
          ],
        },
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
