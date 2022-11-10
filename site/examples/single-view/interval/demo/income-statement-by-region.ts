/**
 * A recreation of this demo: https://www.anychart.com/products/anychart/gallery/Waterfall_Charts/Income_Statement_by_Region.php
 */
import { Chart } from '@antv/g2';
import { group } from 'd3-array';

const chart = new Chart({ container: 'container' });

const view = chart.view().data({
  value: [
    ['Revenue', 175000, 140000, 250650],
    ['Services Revenue', 235050, 225250, 390580],
    ['Fixed Costs', 177950, 160550, 290890],
    ['Sales and Marketing Costs', 121050, 105500, 220500],
    ['Variable Costs', 65890, 55890, 105000],
  ],
  transform: [
    {
      type: 'custom',
      callback: (data) => {
        const result: any[] = [];
        let total = 0;
        data.reduce((r, d, idx) => {
          const prev = idx === 0 ? ['', 0, 0, 0] : data[idx - 1];
          result.push(
            {
              x: d[0],
              type: 'Iowa',
              start: total,
              end: (total += d[1] - prev[1]),
            },
            {
              x: d[0],
              type: 'Oklahoma',
              start: total,
              end: (total += d[2] - prev[2]),
            },
            {
              x: d[0],
              type: 'Texas',
              start: total,
              end: (total += d[3] - prev[3]),
            },
          );
        }, []);
        result.push({ x: 'Total', isTotal: true, start: 0, end: total });
        const iowa = data[data.length - 1][3];
        const oklahoma = data[data.length - 1][2];
        result.push({
          x: 'Texas',
          type: 'Texas',
          isTotal: true,
          start: iowa + oklahoma,
          end: total,
        });
        result.push({
          x: 'Oklahoma',
          type: 'Oklahoma',
          isTotal: true,
          start: iowa,
          end: iowa + oklahoma,
        });
        result.push({
          x: 'Iowa',
          type: 'Iowa',
          isTotal: true,
          start: 0,
          end: iowa,
        });
        return result;
      },
    },
  ],
});

view
  .axis('x', {
    labelAutoRotate: false,
    labelAutoEllipsis: true,
    labelFontSize: 10,
    title: false,
  })
  .axis('y', { tickFormatter: '~s', title: false })
  .scale('color', {
    domain: ['Texas', 'Oklahoma', 'Iowa'],
    range: ['#3c5e79', '#5686ad', '#7bc0f7', '#d6d6d6'],
    guide: { position: 'bottom', title: false },
  });

view
  .call((node) =>
    node
      .link()
      .data({
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
      })
      .encode('x', ['x1', 'x2'])
      .encode('y', ['value'])
      .style('stroke', '#697474')
      .style('lineDash', [4, 2]),
  )
  .call((node) =>
    node
      .interval()
      .encode('x', 'x')
      .encode('y', ['start', 'end'])
      .encode('color', 'type')
      .style('stroke', '#979797')
      .style('lineWidth', 0.5),
  )
  .call((node) =>
    node
      .text()
      .data({
        transform: [
          {
            type: 'custom',
            callback: (data) => {
              const groups = group(data, (d: any) => d.x);
              return Array.from(groups.entries()).reduce((r, [k, v]) => {
                const y = v[v.length - 1].end;
                return r.concat({
                  x: k,
                  y,
                  value:
                    v.length <= 1 ? y : y - (r.length ? r[r.length - 1].y : 0),
                });
              }, [] as any[]);
            },
          },
        ],
      })
      .encode('x', 'x')
      .encode('y', 'y')
      .encode('text', 'value')
      .style({
        fontSize: 10,
        textAlign: 'center',
        textBaseline: 'middle',
        dy: (d) => (d.value > 0 ? -12 : 12),
        background: true,
        backgroundStroke: '#416180',
        backgroundStrokeOpacity: 0.45,
        backgroundLineWidth: 0.5,
        backgroundRadius: 2,
      }),
  );

chart.render();
