import { Text } from '@antv/g';
import { ShapeComponent as SC } from '../../runtime';
import { applyStyle } from '../../shape/utils';
import { select } from '../../utils/selection';

export type TagOptions = Record<string, any>;

/**
 * @todo autoRotate when in polar coordinate
 * Tag shape for Text mark, used in wordCloud plot.
 */
export const Tag: SC<TagOptions> = (options, context) => {
  const { coordinate } = context;
  return (points, value, defaults) => {
    const { color, text = '', fontSize, rotate = 0, transform = '' } = value;
    const textStyle = {
      text: String(text),
      stroke: color,
      fill: color,
      fontSize,
      textAlign: 'center',
      textBaseline: 'middle',
    };
    const [[x0, y0]] = points;
    const n = select(new Text())
      .style('x', x0)
      .style('y', y0)
      .call(applyStyle, defaults)
      .style('transformOrigin', 'center center')
      .style('transform', `${transform}rotate(${rotate}deg)`)
      .style('coordCenter', coordinate.getCenter())
      .call(applyStyle, textStyle)
      .call(applyStyle, options)
      .node();
    return n;
  };
};

Tag.props = {
  defaultMarker: 'point',
  defaultEnterAnimation: 'fadeIn',
  defaultUpdateAnimation: 'morphing',
  defaultExitAnimation: 'fadeOut',
};
