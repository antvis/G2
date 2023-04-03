import { CustomEvent } from '@antv/g';
import { G2Spec, PLOT_CLASS_NAME } from '../../../src';
import { brush } from '../interaction/penguins-point-brush';

export function alphabetIntervalBrushTooltip(): G2Spec {
  return {
    type: 'interval',
    transform: [{ type: 'sortX', by: 'y', reverse: true }],
    data: {
      type: 'fetch',
      value: 'data/alphabet.csv',
    },
    encode: {
      x: 'letter',
      y: 'frequency',
      color: 'steelblue',
    },
    state: {
      active: { fill: 'red' },
    },
    interaction: {
      brushHighlight: true,
    },
  };
}

alphabetIntervalBrushTooltip.steps = ({ canvas }) => {
  const { document } = canvas;
  const plot = document.getElementsByClassName(PLOT_CLASS_NAME)[0];
  return [
    {
      skip: true,
      changeState: () => {
        brush(plot, 400, 300, 600, 400);
      },
    },
    {
      changeState: () => {
        plot.dispatchEvent(
          new CustomEvent('pointerover', {
            offsetX: 500,
            offsetY: 360,
          }),
        );
      },
    },
  ];
};
