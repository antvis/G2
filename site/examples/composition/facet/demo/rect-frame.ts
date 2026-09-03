/**
 * A recreation of one of these demos: https://observablehq.com/@observablehq/plot-facets?collection=@observablehq/plot
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 928,
  height: 320,
  paddingLeft: 60,
  paddingBottom: 60,
});

// Hide the default frame.
// Customize the plot area to mock a frame.
chart.options({
  type: 'facetRect',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/anscombe.json',
  },
  encode: {
    x: 'series',
  },
  children: [
    {
      type: 'point',
      inset: 10,
      encode: {
        x: 'x',
        y: 'y',
      },
      style: {
        stroke: '#000',
      },
      frame: false,
      viewStyle: {
        plotStroke: 'red',
        plotLineWidth: 2,
        plotOpacity: 0.5,
      },
    },
  ],
});

chart.render();
