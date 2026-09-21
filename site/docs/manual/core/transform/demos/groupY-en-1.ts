import * as G2 from '@antv/g2';

const { Chart } = G2;
const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'view',
  height: 180,
  paddingLeft: 80,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/penguins.json',
    transform: [
      {
        type: 'map',
        callback: (d) => ({
          ...d,
          body_mass_g: +d.body_mass_g,
        }),
      },
    ],
  },
  children: [
    {
      type: 'point',
      encode: { x: 'body_mass_g', y: 'species' },
      style: { stroke: '#000' },
    },
    {
      type: 'link',
      encode: { x: 'body_mass_g', y: 'species' },
      transform: [{ type: 'groupY', x: 'min', x1: 'max' }],
      style: { stroke: '#000' },
    },
    {
      type: 'point',
      encode: { y: 'species', x: 'body_mass_g', shape: 'line', size: 12 },
      transform: [{ type: 'groupY', x: 'median' }],
      style: { stroke: 'red' },
    },
  ],
});

chart.render();
