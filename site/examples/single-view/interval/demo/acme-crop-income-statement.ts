/**
 * A recreation of this demo: https://www.anychart.com/products/anychart/gallery/Waterfall_Charts/Waterfall_Arrows.php
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  paddingBottom: 120,
  paddingLeft: 60,
  paddingTop: 40,
});

const view = chart.view().data({
  value: [
    { x: 'Net Sales', value: 5085000 },
    { x: 'Cost of Sales', value: -1250450 },
    { x: 'Operating Expenses', value: -2350050 },
    { x: 'Other Income', value: 750000 },
    { x: 'Extraordinary Gain', value: -230050 },
    { x: 'Interest Expense', value: -500000 },
    { x: 'Taxes', value: 490000 },
    { x: 'Net Income', isTotal: true },
  ],
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
});

view
  .axis('x', { title: false, labelRotate: -90 })
  .axis('y', { tickFormatter: '~s' })
  .scale('color', {
    domain: ['P', 'N', 'D'],
    range: ['#64b5f6', '#ef6c00', '#96a6a6'],
    guide: null,
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
      .encode('y', 'value')
      .style('stroke', '#697474')
      .style('lineDash', [4, 2]),
  )
  .call((node) => {
    node
      .connector()
      .data({
        transform: [
          {
            type: 'custom',
            callback: (data) => {
              const first = data[0];
              const last = data[data.length - 1];
              return [{ x1: first.x, y1: first.end, x2: last.x, y2: last.end }];
            },
          },
        ],
      })
      .encode('x', ['x1', 'x2'])
      .encode('y', ['y1', 'y2'])
      .label({
        text: (d) => `${d.y2 - d.y1}`,
        formatter: '~s',
        fontSize: 10,
        dy: 2,
      })
      .style({ stroke: '#697474', offset: 16 });
  })
  .call((node) =>
    node
      .interval()
      .encode('x', 'x')
      .encode('y', ['start', 'end'])
      .encode('color', (d, idx) =>
        idx === 0 || d.isTotal ? 'D' : d.value > 0 ? 'P' : 'N',
      )
      .encode('size', 24)
      .style('stroke', '#697474')
      .label({
        text: 'value',
        formatter: '~s',
        position: (d) => (d.value > 0 ? 'top' : 'bottom'),
        textBaseline: (d) => (d.value > 0 ? 'bottom' : 'top'),
        fontSize: 10,
        dy: (d) => (d.value > 0 ? -4 : 4),
      }),
  );

chart.render();
