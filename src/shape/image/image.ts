import { Image as GImage } from '@antv/g';
import { ShapeComponent as SC } from '../../runtime';
import { applyStyle } from '../utils';
import { select } from '../../utils/selection';

export type ImageOptions = Record<string, any>;

export const Image: SC<ImageOptions> = (options) => {
  const { ...style } = options;
  return (points, value, coordinate, theme) => {
    const { defaultColor } = theme;
    const { color = defaultColor, src = '', size = 32, transform = '' } = value;
    const [[x0, y0]] = points;

    const x = x0 - Number(size) / 2;
    const y = y0 - Number(size) / 2;

    return select(new GImage())
      .style('x', x)
      .style('y', y)
      .style('width', size)
      .style('height', size)
      .style('img', src)
      .style('stroke', color)
      .style('transform', transform)
      .call(applyStyle, style)
      .node();
  };
};

Image.props = {
  defaultEnterAnimation: 'fadeIn',
};
