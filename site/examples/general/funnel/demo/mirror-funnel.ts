import { Chart } from '@antv/g2';

const data = [
  { action: '访问', visitor: 500, site: '站点1' },
  { action: '浏览', visitor: 400, site: '站点1' },
  { action: '交互', visitor: 300, site: '站点1' },
  { action: '下单', visitor: 200, site: '站点1' },
  { action: '完成', visitor: 100, site: '站点1' },
  { action: '访问', visitor: 550, site: '站点2' },
  { action: '浏览', visitor: 420, site: '站点2' },
  { action: '交互', visitor: 280, site: '站点2' },
  { action: '下单', visitor: 150, site: '站点2' },
  { action: '完成', visitor: 80, site: '站点2' },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.data(data);

chart.scale('x', { padding: 0 });
chart.scale('color', {
  range: ['#0050B3', '#1890FF', '#40A9FF', '#69C0FF', '#BAE7FF'],
});
chart.axis(false);

chart.coordinate({
  transform: [{ type: 'transpose' }],
});

chart
  .interval()
  .data({
    transform: [
      {
        type: 'filter',
        callback: (d) => d.site === '站点1',
      },
    ],
  })
  .encode('x', 'action')
  .encode('y', 'visitor')
  .encode('color', 'action')
  .encode('shape', 'funnel')
  .label({
    text: 'visitor',
    position: 'inside',
    transform: [{ type: 'contrastReverse' }],
  })
  .label({
    text: 'action',
    position: 'right',
    dx: (d) => {
      return d.action === '完成' ? 48 : 16;
    },
  })
  .style('stroke', '#FFF')
  .animate('enter', { type: 'fadeIn' });

chart
  .interval()
  .data({
    transform: [
      {
        type: 'filter',
        callback: (d) => d.site === '站点2',
      },
    ],
  })
  .encode('x', 'action')
  .encode('y', (d) => -d.visitor)
  .encode('color', 'action')
  .encode('shape', 'funnel')
  .label({
    text: 'visitor',
    position: 'inside',
    transform: [{ type: 'contrastReverse' }],
  })
  .style('stroke', '#FFF')
  .animate('enter', { type: 'fadeIn' });

chart.render();
