import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const colors = {
  ranges: ['#bfeec8', '#FFe0b0', '#FFbcb8'],
  measures: ['#61DDAA', '#5B8FF9'],
  target: '#39a3f4',
};

const data = [
  {
    title: '满意度',
    ranges: 100,
    measures: 60,
    target: 90,
  },
  {
    title: '满意度',
    ranges: 80,
    measures: 10,
  },
  {
    title: '满意度',
    ranges: 30,
  },
];

chart.coordinate({ transform: [{ type: 'transpose' }] });

chart
  .data(data)
  .scale('color', {
    range: [...colors['ranges'], ...colors['measures'], colors['target']],
  })
  .legend('color', {
    itemMarker: (d) => {
      return d === '目标' ? 'line' : 'square';
    },
  });

chart
  .interval()
  .style('maxWidth', 30)
  .axis({
    y: {
      grid: true,
      gridLineWidth: 2,
    },
    x: {
      title: false,
    },
  })
  .encode('y', 'ranges')
  .encode('x', 'title')
  .encode('color', (d, i) => ['差', '良', '优'][i]);

chart
  .interval()
  .style('maxWidth', 20)
  .encode('y', 'measures')
  .encode('x', 'title')
  .encode('color', (d, i) => ['上半年', '下半年'][i] || '下半年')
  .label({
    text: 'measures',
    position: 'right',
    textAlign: 'left',
    dx: 5,
  });

chart
  .point()
  .style('lineWidth', 1)
  .encode('size', 8)
  .encode('y', 'target')
  .encode('x', 'title')
  .encode('shape', 'line')
  .encode('color', () => '目标')
  .tooltip({
    title: false,
    items: [{ channel: 'y' }],
  });

chart.interaction('tooltip', { shared: true });

chart.render();
