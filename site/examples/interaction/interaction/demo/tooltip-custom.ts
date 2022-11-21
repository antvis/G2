import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  paddingLeft: 60,
  inset: 6,
});

const names = {
  tooltip: 'min',
  tooltip1: 'q1',
  tooltip2: 'q2',
  tooltip3: 'q3',
  tooltip4: 'max',
};

chart
  .boxplot()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/morley.json',
  })
  .encode('x', 'Expt')
  .encode('y', 'Speed');

chart.interaction({
  type: 'tooltip',
  item: ({ channel, value }) => ({
    name: names[channel],
    color: channel === 'tooltip4' ? 'red' : undefined,
    value: `${value / 1000}k`,
  }),
});

chart.render();
