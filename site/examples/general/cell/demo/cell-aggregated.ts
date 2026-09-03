/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/rect_heatmap_weather.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 300,
});

chart.options({
  type: 'view',
  children: [
    {
      type: 'cell',
      data: {
        type: 'fetch',
        value: 'https://assets.antv.antgroup.com/g2/seattle-weather.json',
      },
      transform: [{ type: 'group', color: 'max' }],
      encode: {
        x: (d) => new Date(d.date).getUTCDate(),
        y: (d) => new Date(d.date).getUTCMonth(),
        color: 'temp_max',
      },
      style: {
        inset: 0.5,
      },
      scale: {
        color: { palette: 'gnBu' },
      },
      animate: {
        enter: { type: 'fadeIn' },
      },
    },
  ],
});

chart.render();
