import { interpolateHcl } from 'd3-interpolate';
import { G2Spec } from '../../../src';

/**
 * @see https://canisjs.github.io/canis-editor/index.html?exmp=polio_1
 */
export function polioPointStackEnter(): G2Spec {
  return {
    type: 'view',
    style: {
      plotFill: '#000',
    },
    children: [
      {
        type: 'point',
        transform: [
          {
            type: 'stackEnter',
            groupBy: ['x', 'y'],
            orderBy: 'color',
            duration: 5000,
          },
        ],
        data: {
          type: 'fetch',
          value: 'data/polio.json',
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
        encode: {
          x: 'x',
          y: 'y',
          color: 'Polio Cases',
        },
        style: {
          shape: 'point',
        },
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
          enter: {
            delay: 5000,
          },
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
          dy: 30,
        },
        animate: {
          enter: {
            delay: 5400,
          },
        },
      },
    ],
  };
}

polioPointStackEnter.intervals = [[2500, 5000]];
