/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/trail_comet.html
 */
import { Chart } from '@antv/g2';
import { rollup } from 'd3-array';

fetch('https://assets.antv.antgroup.com/g2/barley.json')
  .then((res) => res.json())
  .then((data) => {
    const key = (d) => `${d.site},${d.variety}`;
    const keyDelta = rollup(
      data,
      ([a, b]) => {
        if (b.year < a.year) [a, b] = [b, a];
        return b.yield - a.yield;
      },
      key,
    );

    const chart = new Chart({
      container: 'container',
      paddingLeft: 150,
      paddingBottom: 30,
    });

    chart.options({
      type: 'facetRect',
      data: data,
      encode: {
        x: 'site',
      },
      children: [
        {
          type: 'line',
          encode: {
            x: (d) => `${d.year}`,
            y: 'variety',
            series: 'variety',
            color: (d) => keyDelta.get(key(d)),
            size: 'yield',
          },
          tooltip: {
            title: '',
            items: [{ field: 'year' }, { field: 'yield' }],
          },
          scale: {
            size: { range: [0, 12] },
            color: { palette: 'rdBu' },
          },
          style: {
            shape: 'trail',
          },
          legend: {
            color: { title: 'yield delta' },
          },
          frame: false,
          interaction: {
            tooltip: { series: false },
          },
        },
      ],
    });

    chart.render();
  });
