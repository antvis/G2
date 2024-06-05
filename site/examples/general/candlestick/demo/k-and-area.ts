import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .data({
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/stock-03.json',
  })
  .encode('x', 'date')
  .scale('color', {
    domain: ['down', 'up'],
    range: ['#4daf4a', '#e41a1c'],
  })
  .scale('x', {
    compare: (a, b) => new Date(a).getTime() - new Date(b).getTime(),
  })
  .scale('y', {
    domain: [20, 35],
  })
  .axis('x', {
    labelFormatter: (d) => new Date(d).toLocaleDateString(),
  });

chart.interaction('tooltip', {
  shared: true,
});

chart
  .area()
  .encode('y', 'range')
  .style('fillOpacity', 0.3)
  .style('fill', '#64b5f6')
  .animate(false);

chart
  .link()
  .encode('y', ['lowest', 'highest'])
  .encode('color', 'trend')
  .animate('enter', {
    type: 'waveIn',
  });

chart
  .interval()
  .encode('y', ['start', 'end'])
  .encode('color', 'trend')
  .style('fillOpacity', 1)
  .axis('y', {
    title: false,
  })
  .tooltip({
    title: 'date',
    items: [
      { field: 'start' },
      { field: 'end' },
      { field: 'lowest' },
      { field: 'highest' },
    ],
  })
  .animate('enter', {
    type: 'waveIn',
  });

chart.line().encode('x', 'date').encode('y', 'mean').style('stroke', '#FACC14');

chart.render();
