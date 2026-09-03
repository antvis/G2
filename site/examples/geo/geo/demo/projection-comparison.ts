/**
 * A recreation of this demo: https://observablehq.com/@d3/projection-comparison
 */
import { Chart, register } from '@antv/g2';
import { feature } from 'topojson-client';
import { geoPolyconic, geoRectangularPolyconic } from 'd3-geo-projection';

register('data.feature', ({ name }) => {
  return (data) => feature(data, data.objects[name]).features;
});

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'spaceLayer',
  children: [
    worldMap(geoPolyconic, '#f00'),
    worldMap(geoRectangularPolyconic, '#00f'),
  ],
});

chart.render();

function worldMap(projection, color, opacity = 0.7) {
  return {
    type: 'geoView',
    coordinate: {
      type: projection,
      size: 'fitWidth',
    },
    children: [
      {
        type: 'geoPath',
        data: {
          type: 'fetch',
          value: 'https://assets.antv.antgroup.com/g2/countries-50m.json',
          transform: [{ type: 'feature', name: 'land' }],
        },
        style: { fill: color, opacity },
      },
      {
        type: 'geoPath',
        data: { type: 'graticule10' },
        style: { stroke: color, strokeOpacity: 0.3, fill: 'none' },
      },
      {
        type: 'geoPath',
        data: { type: 'sphere' },
        style: { stroke: color, fill: 'none' },
      },
    ],
  };
}
