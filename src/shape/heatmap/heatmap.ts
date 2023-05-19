import { max as d3max, min as d3min } from 'd3-array';
import { Image as GImage } from '@antv/g';
import { applyStyle, getShapeTheme } from '../utils';
import { select } from '../../utils/selection';
import { ShapeComponent as SC } from '../../runtime';
import { HeatmapRenderer } from './renderer';
import type { HeatmapRendererOptions } from './renderer/types';

export type HeatmapOptions = HeatmapRendererOptions;

export const Heatmap: SC<HeatmapOptions> = (options) => {
  const { ...style } = options;
  return (points: number[][], value, coordinate, theme, _, context) => {
    const { mark, shape, defaultShape, transform } = value;
    const {
      defaultColor,
      fill = defaultColor,
      stroke = defaultColor,
      ...shapeTheme
    } = getShapeTheme(theme, mark, shape, defaultShape);

    const [width, height] = coordinate.getSize();
    const data = points.map((p: number[]) => ({
      x: p[0],
      y: p[1],
      value: p[2],
      radius: p[3],
    }));
    const min = d3min(points, (p) => p[2]);
    const max = d3max(points, (p) => p[2]);

    const { createCanvas } = context;
    const ctx = HeatmapRenderer(
      width,
      height,
      min,
      max,
      data,
      { ...style },
      createCanvas,
    );

    return select(new GImage())
      .call(applyStyle, shapeTheme)
      .style('x', 0)
      .style('y', 0)
      .style('width', width)
      .style('height', height)
      .style('src', ctx.canvas)
      .style('transform', transform)
      .call(applyStyle, style)
      .node();
  };
};

Heatmap.props = {
  defaultMarker: 'point',
  defaultEnterAnimation: 'fadeIn',
  defaultUpdateAnimation: 'morphing',
  defaultExitAnimation: 'fadeOut',
};
