// @ts-nocheck
import { Renderer } from '@antv/g-svg';
import { BarChart } from './d3-g-canvas';
import type { Chart } from '../types';

export const d3GSVG: Chart = async (data, { start, end }) => {
  start();
  const node = await BarChart(data, {
    x: (d) => d.letter,
    y: (d) => d.frequency,
    color: 'steelblue',
    renderer: new Renderer(),
  });
  end(node);
};
