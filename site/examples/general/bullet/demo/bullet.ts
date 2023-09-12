import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const data = [
  {
    title: '满意度',
    ranges: 100,
    measures: 80,
    target: 85,
  },
];

chart.coordinate({ transform: [{ type: 'transpose' }] });

chart.data(data);

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
  .encode('x', 'title')
  .encode('y', 'ranges')
  .encode('color', '#f0efff');

chart
  .interval()
  .style('maxWidth', 20)
  .encode('x', 'title')
  .encode('y', 'measures')
  .encode('color', '#5B8FF9')
  .label({
    text: 'measures',
    position: 'right',
    textAlign: 'left',
    dx: 5,
  });

chart
  .point()
  .encode('size', 8)
  .encode('x', 'title')
  .encode('y', 'target')
  .encode('shape', 'line')
  .encode('color', '#3D76DD')
  .tooltip({
    title: false,
    items: [{ channel: 'y' }],
  });

chart.render();
