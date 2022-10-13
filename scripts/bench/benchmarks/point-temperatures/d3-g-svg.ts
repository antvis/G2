// @ts-nocheck
import { Renderer } from '@antv/g-svg';
import { Scatterplot } from './d3-g-canvas';

export async function d3GSVG(data, { start, end }) {
  start();
  const node = await Scatterplot(data, {
    x: (d) => d.date,
    y: (d) => d.value,
    renderer: new Renderer(),
  });
  end(node);
}
