import { Chart } from '@antv/g2';
import { regressionLog } from 'd3-regression';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  autoFit: true,
});

chart.data({
  type: 'fetch',
  value: 'https://assets.antv.antgroup.com/g2/logarithmic-regression.json',
});

chart
  .point()
  .encode('x', 'x')
  .encode('y', 'y')
  .encode('shape', 'point')
  .scale('x', { domain: [0, 35] })
  .style('fillOpacity', 0.75)
  .axis('x', { title: false })
  .axis('y', { title: false });

const logRegression = regressionLog()
  .x((d) => d.x)
  .y((d) => d.y)
  .domain([0.81, 35]);

chart
  .line()
  .data({
    transform: [
      {
        type: 'custom',
        callback: logRegression,
      },
    ],
  })
  .encode('x', (d) => d[0])
  .encode('y', (d) => d[1])
  .encode('shape', 'smooth')
  .style('stroke', '#30BF78')
  .style('lineWidth', 2)
  .label({
    text: 'y = 0.881·ln(x) + 4.173\nThe coefficient of determination, or R^22, is 0.958',
    selector: 'last',
    style: {
      textAlign: 'end',
    },
  })
  .tooltip(false);

chart.render();
