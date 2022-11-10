/**
 * A recreation of this demo: https://www.anychart.com/zh/products/anychart/gallery/Waterfall_Charts/ACME_corp._Revenue_Flow_2017.php
 */
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container', autoFit: true });

const view = chart.view().data({
  value: [
    { x: 'Start', value: 23000000 },
    { x: 'Jan', value: 2200000 },
    { x: 'Feb', value: -4600000 },
    { x: 'Mar', value: -9100000 },
    { x: 'Apr', value: 3700000 },
    { x: 'May', value: -2100000 },
    { x: 'Jun', value: 5300000 },
    { x: 'Jul', value: 3100000 },
    { x: 'Aug', value: -1500000 },
    { x: 'Sep', value: 4200000 },
    { x: 'Oct', value: 5300000 },
    { x: 'Nov', value: -1500000 },
    { x: 'Dec', value: 5100000 },
    { x: 'End', isTotal: true },
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
  .axis('x', { title: false })
  .axis('y', { tickFormatter: '~s' })
  .scale('color', {
    domain: ['P', 'N', 'D'],
    range: ['#64b5f6', '#ef6c00', '#96a6a6'],
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
      .style('stroke', '#697474'),
  )
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
