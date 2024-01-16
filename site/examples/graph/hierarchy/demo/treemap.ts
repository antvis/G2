import { Chart } from '@antv/g2';
import { schemeTableau10 } from 'd3-scale-chromatic';

const chart = new Chart({
  container: 'container',
  height: 900,
  width: 1100,
});

chart
  .treemap()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/flare-treemap.json',
  })
  .layout({
    path: (d) => d.name.replace(/\./g, '/'),
    tile: 'treemapBinary',
    paddingInner: 1,
  })
  .encode('value', 'size')
  .scale('color', { range: schemeTableau10 })
  .style(
    'labelText',
    (d) =>
      d.data.name
        .split('.')
        .pop()
        .split(/(?=[A-Z][a-z])/g)[0],
  )
  .style('labelFill', '#000')
  .style('labelPosition', 'top-left')
  .style('fillOpacity', 0.5);

chart.render();
