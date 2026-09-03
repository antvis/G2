/**
 * A recreation of this demo: https://canisjs.github.io/canis-editor/index.html?exmp=polio_1
 */
import { Chart } from '@antv/g2';
import { interpolateHcl } from 'd3-interpolate';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  style: {
    plotFill: '#000',
  },
  children: [
    {
      type: 'point',
      data: {
        type: 'fetch',
        value: 'https://assets.antv.antgroup.com/g2/polio.json',
      },
      encode: {
        x: 'x',
        y: 'y',
        color: 'Polio Cases',
        shape: 'point',
      },
      transform: [
        {
          type: 'stackEnter',
          groupBy: ['x', 'y'],
          orderBy: 'color',
          duration: 2000,
        },
      ],
      legend: {
        color: false,
      },
      scale: {
        y: { range: [0, 1] },
        color: {
          type: 'sqrt',
          range: ['hsl(152,80%,80%)', 'hsl(228,30%,40%)'],
          interpolate: interpolateHcl,
        },
      },
      padding: 0,
      axis: false,
    },
    {
      type: 'text',
      style: {
        text: 'Polio incidence rates',
        x: '50%',
        y: '50%',
        textAlign: 'center',
        fontSize: 24,
        fill: '#666',
      },
      animate: {
        enter: { delay: 2000 },
      },
    },
    {
      type: 'text',
      style: {
        text: 'United States, 1950s',
        x: '50%',
        y: '50%',
        textAlign: 'center',
        fontSize: 18,
        fill: '#666',
        dy: '30',
      },
      animate: {
        enter: { delay: 2400 },
      },
    },
  ],
});

chart.render();
