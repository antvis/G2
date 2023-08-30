/**
 * A recreation of this demo: https://observablehq.com/@d3/world-map
 */
import { Chart, register } from '@antv/g2';
import { feature } from 'topojson';

register('data.feature', ({ name }) => {
  return (data) => feature(data, data.objects[name]).features;
});

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

const geoView = chart.geoView().coordinate({ type: 'orthographic' });

geoView
  .geoPath()
  .data({ type: 'graticule10' })
  .style('stroke', '#ccc')
  .style('fill', 'none');

geoView
  .geoPath()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/countries-50m.json',
    transform: [{ type: 'feature', name: 'land' }],
  })
  .style('fill', 'black');

geoView
  .geoPath()
  .data({ type: 'sphere' })
  .style('stroke', 'black')
  .style('fill', 'none');

chart.render();
