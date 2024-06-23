/**
 * A recreation of one of these demos: https://observablehq.com/@observablehq/plot-facets?collection=@observablehq/plot
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 928,
  height: 320,
  paddingLeft: 60,
  paddingBottom: 60,
});

const facetRect = chart
  .facetRect()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/anscombe.json',
  })
  .encode('x', 'series');

facetRect
  .point()
  .attr('inset', 10)
  .encode('x', 'x')
  .encode('y', 'y')
  .style('stroke', '#000')
  .attr('frame', false) // Hide the default frame.
  .viewStyle('plotStroke', 'red') // Customize the plot area to mock a frame.
  .viewStyle('plotLineWidth', 2)
  .viewStyle('plotOpacity', 0.5);

chart.render();
