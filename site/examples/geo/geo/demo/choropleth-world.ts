/**
 * A recreation of this demo: https://observablehq.com/@d3/world-choropleth
 */
import { Chart } from '@antv/g2';
import { feature, mesh } from 'topojson';

Promise.all([
  fetch('https://assets.antv.antgroup.com/g2/countries-50m.json').then((res) =>
    res.json(),
  ),
  fetch('https://assets.antv.antgroup.com/g2/hale.json').then((res) =>
    res.json(),
  ),
]).then((values) => {
  const [world, hale] = values;
  const countries = feature(world, world.objects.countries).features;
  const coutriesmesh = mesh(world, world.objects.countries);

  const chart = new Chart({
    container: 'container',
    autoFit: true,
  });

  const geoView = chart.geoView();

  geoView
    .geoPath()
    .data({
      value: countries,
      transform: [
        {
          type: 'join',
          join: hale,
          on: [(d) => d.properties.name, 'name'],
          select: ['hale'],
        },
      ],
    })
    .scale('color', {
      type: 'sequential',
      palette: 'ylGnBu',
      unknown: '#ccc',
    })
    .encode('color', 'hale');

  geoView.geoPath().data([coutriesmesh]).style('stroke', '#fff');

  geoView.geoPath().data({ type: 'sphere' }).style('stroke', '#000');

  chart.render();
});
