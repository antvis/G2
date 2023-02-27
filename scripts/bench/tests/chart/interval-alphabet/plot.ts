import * as Plot from '@observablehq/plot';
import type { Chart } from '../types';

export const plotSVG: Chart = (data, { start, end }) => {
  start();
  const node = Plot.barY(data, {
    x: 'letter',
    y: 'frequency',
    fill: 'steelblue',
  }).plot({
    width: 640,
    height: 480,
  });
  end(node);
};
