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

chart.data(data).legend(false);

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
  .style('fill', (d, i) => colors['ranges'][i])
  .encode('color', 'ranges');

chart
  .interval()
  .style('maxWidth', 20)
  .encode('y', 'measures')
  .encode('color', '#5B8FF9')
  .encode('x', 'title')
  .style('fill', (d, i) => colors['measures'][i])
  .label({
    text: 'measures',
    position: 'right',
    textAlign: 'left',
    dx: 5,
  });

chart
  .point()
  .encode('size', 8)
  .style('lineWidth', 1)
  .encode('y', 'target')
  .encode('x', 'title')
  .encode('shape', 'line')
  .encode('color', colors['target'])
  .tooltip({
    title: false,
    items: [{ channel: 'y' }],
  });

chart.render();
