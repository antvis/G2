import { Chart } from '@antv/g2';

/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/layer_falkensee.html
 */

const chart = new Chart({
  container: 'container',
});

const encode = { x: (d) => new Date(d.year), y: 'population', color: '#333' };

chart.options({
  type: 'view',
  width: 600,
  height: 360,
  paddingLeft: 60,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/year-population.json',
  },
  children: [
    {
      type: 'rangeX',
      data: [
        { year: [new Date('1933'), new Date('1945')], event: 'Nazi Rule' },
        {
          year: [new Date('1948'), new Date('1989')],
          event: 'GDR (East Germany)',
        },
      ],
      encode: { x: 'year', color: 'event' },
      scale: { color: { independent: true, range: ['#FAAD14', '#30BF78'] } },
      style: { fillOpacity: 0.75 },
    },
    {
      type: 'line',
      encode,
    },
    {
      type: 'point',
      encode,
      style: { lineWidth: 1.5 },
    },
  ],
});

chart.render();
