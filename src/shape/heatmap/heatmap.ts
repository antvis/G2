import { Image as GImage } from '@antv/g';
import { applyStyle, getShapeTheme } from '../utils';
import { select } from '../../utils/selection';
import { ShapeComponent as SC, Vector2 } from '../../runtime';

export type HeatmapOptions = Record<string, any>;

export const Heatmap: SC<HeatmapOptions> = (options) => {
  const { ...style } = options;
  return (points, value, coordinate, theme) => {
    const { mark, shape, defaultShape, color, transform } = value;
    const {
      defaultColor,
      fill = defaultColor,
      stroke = defaultColor,
      ...shapeTheme
    } = getShapeTheme(theme, mark, shape, defaultShape);

    return select(new GImage())
      .call(applyStyle, shapeTheme)
      .style('src', '')
      .style('transform', transform)
      .call(applyStyle, style)
      .node();
  };
};

Box.props = {
  defaultMarker: 'point',
  defaultEnterAnimation: 'fadeIn',
  defaultUpdateAnimation: 'morphing',
  defaultExitAnimation: 'fadeOut',
};
