import { Coordinate } from '@antv/coord';
import { select } from '../../utils/selection';
import { G2Theme, ShapeComponent as SC, Vector2 } from '../../runtime';
import { applyStyle } from '../../shape/utils';
import { isTranspose, isCircular } from '../../utils/coordinate';
import { camelCase } from '../../utils/string';
import { TextShape } from '../text/text';
import { LabelPosition } from './position';
import * as PositionProcessor from './position';

export type LabelOptions = Record<string, any>;

function inferPosition(position: LabelPosition, coordinate: Coordinate) {
  if (position !== undefined) return position;
  if (isCircular(coordinate)) return 'inside';
  if (isTranspose(coordinate)) return 'right';
  return 'top';
}

function getDefaultStyle(
  points: Vector2[],
  value: Record<string, any>,
  coordinate: Coordinate,
  theme: G2Theme,
): Record<string, any> {
  // For non-series mark, calc position for label based on
  // position and the bounds of shape.
  const { position } = value;
  const p = inferPosition(position, coordinate);
  const t = theme[p === 'inside' ? 'innerLabel' : 'label'];
  const v = Object.assign({}, t, value);
  return {
    ...t,
    ...PositionProcessor[camelCase(p)](p, points, v, coordinate),
  };
}

/**
 * Render normal label for each mark.
 * @todo Support position option: middle...
 */
export const Label: SC<LabelOptions> = (options) => {
  return (points, value, coordinate, theme) => {
    const { text, x, y, ...overrideStyle } = value;
    const {
      rotate = 0,
      transform = '',
      ...defaultStyle
    } = getDefaultStyle(points, value, coordinate, theme);

    return select(new TextShape())
      .call(applyStyle, defaultStyle)
      .style('text', `${text}`)
      .style('transform', `${transform}rotate(${+rotate}deg)`)
      .call(applyStyle, overrideStyle)
      .node();
  };
};

Label.props = {};
