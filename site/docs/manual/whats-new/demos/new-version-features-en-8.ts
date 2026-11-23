import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  paddingLeft: 50,
  paddingBottom: 50,
});

chart.options({
  type: 'facetRect',
  encode: { y: 'sex' },
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/athletes.json',
  },
  children: [
    {
      type: 'rect',
      encode: { x: 'weight' },
      transform: [{ type: 'binX', y: 'count' }],
      style: { inset: 0.5 },
    },
  ],
});

chart.render();
