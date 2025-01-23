// @ts-ignore
import { regressionQuad } from '@antv/vendor/d3-regression';
import { G2Spec, PLOT_CLASS_NAME } from '../../../src';
import { points } from '../../data/points';
import { step } from './utils';

const regression = regressionQuad()
  .x((d) => d.x)
  // @ts-ignore
  .y((d) => d.y)
  .domain([-4, 4]);

export function pointsPointTooltipMarker(): G2Spec {
  return {
    type: 'line',
    inset: 30,
    data: {
      value: points,
      transform: [{ type: 'custom', callback: regression }],
    },
    encode: {
      x: (d) => d[0],
      y: (d) => d[1],
    },
    style: {
      stroke: '#30BF78',
      lineWidth: 2,
    },
    scale: { x: { domain: [-4, 4] }, y: { domain: [-2, 14] } },
    axis: { x: { title: false }, y: { title: false } },
    interaction: {
      tooltip: {
        body: false,
        crosshairs: false,
        markerR: 20,
        markerLineWidth: 5,
        markerStroke: 'yellow',
      },
    },
  };
}

pointsPointTooltipMarker.tooltip = true;

pointsPointTooltipMarker.steps = ({ canvas }) => {
  const { document } = canvas;
  const [plot] = document.getElementsByClassName(PLOT_CLASS_NAME);
  return [
    step(plot, 'pointermove', {
      offsetX: 450,
      offsetY: 350,
    }),
  ];
};
