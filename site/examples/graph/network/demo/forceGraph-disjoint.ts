import { Chart } from '@antv/g2';
import { schemeTableau10 } from 'd3-scale-chromatic';

const chart = new Chart({
  container: 'container',
  width: 800,
  height: 800,
});

chart
  .forceGraph()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/miserable-disjoint.json',
  })
  .layout({
    joint: false,
  })
  .scale('color', { range: schemeTableau10 });

chart.render();
