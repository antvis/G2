import { Path as GPath } from '@antv/g';
import { path as d3path } from 'd3-path';
import { applyStyle, arrowPoints, ArrowOptions, getShapeTheme } from '../utils';
import { select } from '../../utils/selection';
import { ShapeComponent as SC } from '../../runtime';

export type PathOptions = {
  /**
   * Whether draw arrow, Default: false.
   */
  arrow?: ArrowOptions;
  [key: string]: any;
};

/**
 * Connect 2 points with a single line.
 */
export const Path: SC<PathOptions> = (options) => {
  const { arrow, ...style } = options;
  return (points, value, coordinate, theme) => {
    const { mark, shape, defaultShape } = value;
    const { stroke, ...shapeTheme } = getShapeTheme(
      theme,
      mark,
      shape,
      defaultShape,
    );
    const { d, color } = value;
    return select(new GPath())
      .call(applyStyle, shapeTheme)
      .style('d', d)
      .style('fill', color)
      .call(applyStyle, style)
      .node();
  };
};

Path.props = {
  defaultEnterAnimation: 'fadeIn',
};
