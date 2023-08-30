import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .interval()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/alphabet.json',
  })
  .encode('x', 'letter')
  .encode('y', 'frequency')
  .encode('color', 'letter')
  .label({
    text: 'frequency',
    position: 'inside',
    formatter: '.0%',
    fill: '#000',
    transform: [
      {
        type: 'contrastReverse',
        threshold: 21,
        palette: ['#000', '#fff'], // Use full color string to avoid screenshot error.
      },
    ],
  });

chart.render();
