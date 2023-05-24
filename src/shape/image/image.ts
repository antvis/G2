import { Image as GImage } from '@antv/g';
import { ShapeComponent as SC } from '../../runtime';
import { applyStyle, getShapeTheme } from '../utils';
import { select } from '../../utils/selection';
import { p } from '../../mark/utils';

export type ImageOptions = Record<string, any>;

export const Image: SC<ImageOptions> = (options) => {
  const { ...style } = options;
  return (points, value, coordinate, theme) => {
    const { mark, shape, defaultShape } = value;
    const { defaultColor, ...shapeTheme } = getShapeTheme(
      theme,
      mark,
      shape,
      defaultShape,
    );
    const { color = defaultColor, src = '', size = 32, transform = '' } = value;
    let { width = size, height = size } = style;
    const [[x0, y0]] = points;

    // Support percentage width, height.
    const [w, h] = coordinate.getSize();
    width = typeof width === 'string' ? p(width) * w : width;
    height = typeof height === 'string' ? p(height) * h : height;

    const x = x0 - Number(width) / 2;
    const y = y0 - Number(height) / 2;

    return select(new GImage())
      .call(applyStyle, shapeTheme)
      .style('x', x)
      .style('y', y)
      .style('img', src)
      .style('stroke', color)
      .style('transform', transform)
      .call(applyStyle, style)
      .style('width', width)
      .style('height', height)
      .node();
  };
};

Image.props = {
  defaultEnterAnimation: 'fadeIn',
  defaultUpdateAnimation: 'morphing',
  defaultExitAnimation: 'fadeOut',
};
