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

    const facet = chart.facetRect().data(data).encode('x', 'site');

    facet
      .line()
      .encode('x', (d) => `${d.year}`)
      .encode('y', 'variety')
      .encode('series', 'variety')
      .encode('color', (d) => keyDelta.get(key(d)))
      .encode('size', 'yield')
      .tooltip({ title: '', items: [{ field: 'year' }, { field: 'yield' }] })
      .scale('size', { range: [0, 12] })
      .scale('color', { palette: 'rdBu' })
      .style('shape', 'trail')
      .legend('color', { title: 'yield delta' })
      .attr('frame', false)
      .interaction('tooltip', { series: false });

    chart.render();
  });
