import { csv } from '@antv/vendor/d3-fetch';
import { autoType } from '@antv/vendor/d3-dsv';
import { G2Spec, PLOT_CLASS_NAME } from '../../../src';
import { step } from './utils';

export async function indicesLineCrosshairsXY(): Promise<G2Spec> {
  const data = await csv('data/indices.csv', autoType);
  return {
    type: 'view',
    children: [
      {
        type: 'line',
        data,
        axis: {
          y: { labelAutoRotate: false },
        },
        transform: [{ type: 'normalizeY', basis: 'first', groupBy: 'color' }],
        legend: false,
        encode: {
          x: 'Date',
          y: 'Close',
          color: 'Symbol',
          key: 'Symbol',
        },
        state: {
          active: { stroke: 'red' },
        },
      },
    ],
    interaction: {
      tooltip: {
        crosshairs: true,
        crosshairsXStroke: 'red',
        crosshairsYStroke: 'blue',
      },
    },
  };
}

indicesLineCrosshairsXY.tooltip = true;

indicesLineCrosshairsXY.steps = ({ canvas }) => {
  const { document } = canvas;
  const [plot] = document.getElementsByClassName(PLOT_CLASS_NAME);
  return [
    step(plot, 'pointermove', {
      offsetX: 100,
      offsetY: 350,
    }),
    step(plot, 'pointermove', {
      offsetX: 176,
      offsetY: 350,
    }),
  ];
};
