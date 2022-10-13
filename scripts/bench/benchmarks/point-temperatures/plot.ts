import * as Plot from '@observablehq/plot';

export function plotSVG(data, { start, end }) {
  start();
  const node = Plot.dotX(data, { x: 'date', y: 'value' }).plot({
    width: 640,
    height: 480,
  });
  end(node);
}
