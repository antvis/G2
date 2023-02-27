import { render } from '@antv/g2v5';
import type { Chart } from '../types';

export const g2V5CanvasSpec: Chart = (data, { start, end }) => {
  let node: HTMLElement;
  start();
  node = render(
    {
      type: 'point',
      data,
      encode: {
        x: 'date',
        y: 'value',
      },
      style: {
        stroke: 'black',
        fill: 'white',
      },
      animate: false,
    },
    undefined,
    () => end(node),
  );
};
