/**
 * A recreation of this demo: https://observablehq.com/@d3/world-map
 */
import { Chart } from '@antv/g2';
import { feature } from 'topojson';

fetch('https://assets.antv.antgroup.com/g2/countries-50m.json')
  .then((res) => res.json())
  .then((world) => {
    const land = feature(world, world.objects.land).features;

    const chart = new Chart({
      container: 'container',
      theme: 'classic',
      autoFit: true,
    });

    const geoView = chart.geoView().coordinate({ type: 'orthographic' });

    geoView.geoPath().data({ type: 'graticule10' }).style('stroke', '#ccc');

    geoView.geoPath().data(land).style('fill', 'black');

    geoView.geoPath().data({ type: 'sphere' }).style('stroke', 'black');

    chart.render();
  });
