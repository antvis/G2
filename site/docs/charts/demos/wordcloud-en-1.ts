import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 600,
});

chart.options({
  type: 'wordCloud',
  paddingTop: 40,
  layout: { spiral: 'rectangular', fontSize: [20, 100] },
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/philosophy-word.json',
  },
  encode: { color: 'text' },
});

chart.render();
