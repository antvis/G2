import * as Plot from '@observablehq/plot';
import type { Chart } from '../types';

export const plotSVG: Chart = (data, { start, end }) => {
  start();
  const node = Plot.dotX(data, { x: 'date', y: 'value' }).plot({
    width: 640,
    height: 480,
  });
  end(node);
};
