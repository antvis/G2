import { render, stdlib } from '@antv/g2v5';
import type { Chart } from '../types';

export const g2V5CanvasSpec: Chart = (data, { start, end }) => {
  start();
  const node = render(
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
    { library: stdlib() },
    () => end(node),
  );
};
