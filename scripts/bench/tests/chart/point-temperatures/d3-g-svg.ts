// @ts-nocheck
import { Renderer } from '@antv/g-svg';
import { Scatterplot } from './d3-g-canvas';
import type { Chart } from '../types';

export const d3GSVG: Chart = async (data, { start, end }) => {
  start();
  const node = await Scatterplot(data, {
    x: (d) => d.date,
    y: (d) => d.value,
    renderer: new Renderer(),
  });
  end(node);
};
