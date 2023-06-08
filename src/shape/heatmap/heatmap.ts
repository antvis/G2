import { max as d3max, min as d3min } from 'd3-array';
import { applyStyle } from '../utils';
import { select } from '../../utils/selection';
import { ShapeComponent as SC } from '../../runtime';
import { HeatmapRenderer } from './renderer';
import type { HeatmapRendererOptions } from './renderer/types';

export type HeatmapOptions = HeatmapRendererOptions;

function deleteKey(obj: any, fn: (v, k) => boolean) {
  return Object.keys(obj).reduce((r, k) => {
    const v = obj[k];
    if (!fn(v, k)) r[k] = v;
    return r;
  }, {});
}

export const Heatmap: SC<HeatmapOptions> = (options, context) => {
  const {
    gradient,
    opacity,
    maxOpacity,
    minOpacity,
    blur,
    useGradientOpacity,
    ...style
  } = options;
  const { coordinate, createCanvas, document } = context;
  return (points: number[][], value, defaults) => {
    const { transform } = value;
    const [width, height] = coordinate.getSize();
    const data = points.map((p: number[]) => ({
      x: p[0],
      y: p[1],
      value: p[2],
      radius: p[3],
    }));

    const min = d3min(points, (p) => p[2]);
    const max = d3max(points, (p) => p[2]);

    const options = {
      gradient,
      opacity,
      minOpacity,
      maxOpacity,
      blur,
      useGradientOpacity,
    };
    const ctx =
      width && height
        ? HeatmapRenderer(
            width,
            height,
            min,
            max,
            data,
            deleteKey(options, (v) => v === undefined),
            createCanvas,
          )
        : { canvas: null };

    return select(document.createElement('image', {}))
      .call(applyStyle, defaults)
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
