/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/geo_layer_line_london.html
 */
import { Chart } from '@antv/g2';
import { feature } from 'topojson';

Promise.all([
  fetch('https://assets.antv.antgroup.com/g2/londonBoroughs.json').then((res) =>
    res.json(),
  ),
  fetch('https://assets.antv.antgroup.com/g2/londonCentroids.json').then(
    (res) => res.json(),
  ),
  fetch('https://assets.antv.antgroup.com/g2/londonTubeLines.json').then(
    (res) => res.json(),
  ),
]).then((values) => {
  const [londonBoroughs, londonCentroids, londonTubeLines] = values;
  const london = feature(
    londonBoroughs,
    londonBoroughs.objects.boroughs,
  ).features;
  const line = feature(londonTubeLines, londonTubeLines.objects.line).features;

  const chart = new Chart({
    container: 'container',
    autoFit: true,
  });

  const geoView = chart.geoView();

  geoView
    .geoPath()
    .data(london)
    .style('fill', 'lightgray')
    .style('stroke', 'white')
    .style('lineWidth', 2);

  geoView
    .text()
    .data(londonCentroids)
    .encode('x', 'cx')
    .encode('y', 'cy')
    .encode('text', (d) => d.name.split(/\W/)[0])
    .style('fontSize', 8)
    .style('opacity', 0.6);

  geoView
    .geoPath()
    .data(line)
    .encode('color', 'id')
    .encode('shape', 'hollow')
    .scale('color', {
      domain: [
        'Bakerloo',
        'Central',
        'Circle',
        'District',
        'DLR',
        'Hammersmith & City',
        'Jubilee',
        'Metropolitan',
        'Northern',
        'Piccadilly',
        'Victoria',
        'Waterloo & City',
      ],
      range: [
        'rgb(137,78,36)',
        'rgb(220,36,30)',
        'rgb(255,206,0)',
        'rgb(1,114,41)',
        'rgb(0,175,173)',
        'rgb(215,153,175)',
        'rgb(106,114,120)',
        'rgb(114,17,84)',
        'rgb(0,0,0)',
        'rgb(0,24,168)',
        'rgb(0,160,226)',
        'rgb(106,187,170)',
      ],
    });

  chart.render();
});
