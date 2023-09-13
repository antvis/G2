import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const data = [
  {
    title: '5🌟',
    ranges: 100,
    measures: 40,
    target: 85,
  },
  {
    title: '4🌟',
    ranges: 100,
    measures: 80,
    target: 40,
  },
  {
    title: '3🌟',
    ranges: 100,
    measures: 20,
    target: 22,
  },
  {
    title: '0-2🌟',
    ranges: 100,
    measures: 30,
    target: 10,
  },
];

chart.coordinate({ transform: [{ type: 'transpose' }] });

chart.data(data);

chart
  .interval()
  .encode('x', 'title')
  .encode('y', 'ranges')
  .encode('color', '#f0efff')
  .style('maxWidth', 30)
  .axis({
    y: {
      grid: true,
      gridLineWidth: 2,
    },
    x: {
      title: false,
    },
  });

chart
  .interval()
  .encode('x', 'title')
  .encode('y', 'measures')
  .encode('color', '#5B8FF9')
  .style('maxWidth', 20)
  .label({
    text: 'measures',
    position: 'right',
    textAlign: 'left',
    dx: 5,
  });

chart
  .point()
  .encode('size', 15)
  .encode('x', 'title')
  .encode('y', 'target')
  .encode('shape', 'line')
  .encode('color', 'red')
  .tooltip({
    title: false,
    items: [{ channel: 'y' }],
  });

chart.render();
