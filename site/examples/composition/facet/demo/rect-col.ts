/**
 * A recreation of one of these demos: https://observablehq.com/@observablehq/plot-facets?collection=@observablehq/plot
 */
import { Chart } from '@antv/g2';
import { groupSort, median } from 'd3-array';

fetch('https://assets.antv.antgroup.com/g2/barley.json')
  .then((res) => res.json())
  .then((data) => {
    const chart = new Chart({
      container: 'container',
      height: 800,
      paddingLeft: 140,
      paddingRight: 130,
      paddingBottom: 60,
    });

    const facetRect = chart
      .facetRect()
      .data(data)
      .encode('y', 'site')
      .scale('y', {
        domain: groupSort(
          data,
          (g) => -median(g, (d) => d.yield),
          (d) => d.site,
        ),
      });

    facetRect
      .point()
      .attr('insetLeft', 5)
      .attr('insetRight', 5)
      .scale('color', { type: 'ordinal' })
      .scale('y', {
        domain: groupSort(
          data,
          (g) => -median(g, (d) => d.yield),
          (d) => d.variety,
        ),
      })
      .encode('x', 'yield')
      .encode('y', 'variety')
      .encode('color', 'year')
      .encode('shape', 'hollow')
      .axis('y', { labelAutoRotate: false });

    chart.render();
  });
