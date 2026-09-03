/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/layer_falkensee.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 360,
});

chart.options({
  type: 'view',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/year-population.json',
  },
  interaction: {
    legendFilter: false,
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
      encode: {
        x: 'year',
        color: 'event',
      },
      scale: {
        color: { independent: true, range: ['#FAAD14', '#30BF78'] },
      },
      style: {
        fillOpacity: 0.75,
      },
      tooltip: false,
    },
    {
      type: 'line',
      encode: {
        x: (d) => new Date(d.year),
        y: 'population',
        color: '#333',
      },
    },
    {
      type: 'point',
      encode: {
        x: (d) => new Date(d.year),
        y: 'population',
        color: '#333',
      },
      style: {
        lineWidth: 1.5,
      },
      tooltip: false,
    },
  ],
});

chart.render();
