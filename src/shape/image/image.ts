import { ShapeComponent as SC } from '../../runtime';
import { applyStyle } from '../utils';
import { select } from '../../utils/selection';
import { p } from '../../mark/utils';

export type ImageOptions = Record<string, any>;

export const Image: SC<ImageOptions> = (options, context) => {
  const { coordinate, document } = context;
  return (points, value, defaults) => {
    const { color: defaultColor, ...rest } = defaults;
    const { color = defaultColor, src = '', size = 32, transform = '' } = value;
    let { width = size, height = size } = options;
    const [[x0, y0]] = points;

    // Support percentage width, height.
    const [w, h] = coordinate.getSize();
    width = typeof width === 'string' ? p(width) * w : width;
    height = typeof height === 'string' ? p(height) * h : height;

    const x = x0 - Number(width) / 2;
    const y = y0 - Number(height) / 2;

    return select(document.createElement('image', {}))
      .call(applyStyle, rest)
      .style('x', x)
      .style('y', y)
      .style('src', src)
      .style('stroke', color)
      .style('transform', transform)
      .call(applyStyle, options)
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
