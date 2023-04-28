/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/geo_choropleth.html
 */
import { Chart, register } from '@antv/g2';
import { feature } from 'topojson';

register('data.feature', ({ name }) => {
  return (data) => feature(data, data.objects[name]).features;
});

fetch('https://assets.antv.antgroup.com/g2/unemployment2.json')
  .then((res) => res.json())
  .then((data) => {
    const chart = new Chart({
      container: 'container',
      theme: 'classic',
      autoFit: true,
    });

    chart
      .geoPath()
      .coordinate({ type: 'albersUsa' })
      .data({
        type: 'fetch',
        value: 'https://assets.antv.antgroup.com/g2/us-10m.json',
        transform: [
          { type: 'feature', name: 'counties' },
          {
            type: 'join',
            join: data,
            on: ['id', 'id'],
            select: ['rate'],
          },
        ],
      })
      .scale('color', {
        palette: 'ylGnBu',
        unknown: '#fff',
      })
      .encode('color', 'rate')
      .legend({ color: { layout: { justifyContent: 'center' } } });

    chart.render();
  });
