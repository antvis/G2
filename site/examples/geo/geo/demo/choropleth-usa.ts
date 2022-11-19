/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/geo_choropleth.html
 */
import { Chart } from '@antv/g2';
import { feature } from 'topojson';

Promise.all([
  fetch('https://assets.antv.antgroup.com/g2/us-10m.json').then((res) =>
    res.json(),
  ),
  fetch('https://assets.antv.antgroup.com/g2/unemployment2.json').then((res) =>
    res.json(),
  ),
]).then((values) => {
  const [us, unemployment] = values;
  const counties = feature(us, us.objects.counties).features;

  const chart = new Chart({
    container: 'container',
    autoFit: true,
  });

  chart
    .geoPath()
    .projection({ type: 'albersUsa' })
    .data({
      value: counties,
      transform: [
        {
          type: 'join',
          join: unemployment,
          on: ['id', 'id'],
          select: ['rate'],
        },
      ],
    })
    .scale('color', {
      type: 'sequential',
      palette: 'ylGnBu',
      unknown: '#fff',
    })
    .encode('color', 'rate');

  chart.render();
});
