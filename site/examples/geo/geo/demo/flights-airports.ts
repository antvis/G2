/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/geo_rule.html
 */
import { Chart } from '@antv/g2';
import { feature } from 'topojson';

Promise.all([
  fetch('https://assets.antv.antgroup.com/g2/us-10m.json').then((res) =>
    res.json(),
  ),
  fetch('https://assets.antv.antgroup.com/g2/airports.json').then((res) =>
    res.json(),
  ),
  fetch('https://assets.antv.antgroup.com/g2/flights-airport.json').then(
    (res) => res.json(),
  ),
]).then((values) => {
  const [us, airports, flights] = values;
  const states = feature(us, us.objects.states).features;

  const chart = new Chart({
    container: 'container',
    autoFit: true,
  });

  const geoView = chart.geoView().projection({ type: 'albersUsa' });

  geoView
    .geoPath()
    .data(states)
    .style('fill', 'lightgray')
    .style('stroke', 'white');

  geoView
    .point()
    .data(airports)
    .encode('x', 'longitude')
    .encode('y', 'latitude')
    .encode('color', 'gray')
    .encode('shape', 'point')
    .style('r', 1);

  geoView
    .link()
    .data({
      value: flights,
      transform: [
        {
          type: 'filterBy',
          fields: [['origin', (d) => d === 'SEA']],
        },
        {
          type: 'join',
          join: airports,
          on: ['origin', 'iata'],
          select: ['origin_latitude', 'origin_longitude'],
        },
        {
          type: 'join',
          join: airports,
          on: ['destination', 'iaiatata'],
          select: ['dest_latitude', 'dest_longitude'],
        },
      ],
    })
    .encode('x', ['origin_longitude', 'dest_longitude'])
    .encode('y', ['origin_latitude', 'dest_latitude'])
    .style('stroke', 'black');

  chart.render();
});
