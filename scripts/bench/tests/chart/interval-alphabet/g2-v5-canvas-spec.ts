import { render } from '@antv/g2v5';
import type { Chart } from '../types';

export const g2V5CanvasSpec: Chart = (data, { start, end }) => {
  let node: HTMLElement;
  start();
  node = render(
    {
      type: 'interval',
      data,
      encode: {
        x: 'letter',
        y: 'frequency',
        color: 'steelblue',
      },
      animate: false,
    },
    undefined,
    () => end(node),
  );
};
