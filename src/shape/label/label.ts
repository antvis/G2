import { Coordinate } from '@antv/coord';
import { select } from '../../utils/selection';
import { G2Theme, ShapeComponent as SC, Vector2 } from '../../runtime';
import { applyStyle } from '../../shape/utils';
import { isTranspose, isCircular } from '../../utils/coordinate';
import { camelCase } from '../../utils/string';
import { Advance } from '../text/advance';
import { LabelPosition } from './position/default';
import * as PositionProcessor from './position';

export type LabelOptions = {
  /**
   * Customize label with html string or element.
   */
  render: (text: string, datum: any, index: number) => string | HTMLElement;
  [key: string]: any;
};

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
  options: LabelOptions,
  labels: Vector2[][],
): Record<string, any> {
  // For non-series mark, calc position for label based on
  // position and the bounds of shape.
  const { position } = value;
  const { render } = options;
  const p = inferPosition(position, coordinate);
  const labelType = render
    ? 'htmlLabel'
    : p === 'inside'
    ? 'innerLabel'
    : 'label';
  const t = theme[labelType];
  const v = Object.assign({}, t, value);
  const processor = PositionProcessor[camelCase(p)];
  if (!processor) {
    throw new Error(`Unknown position: ${p}`);
  }
  return {
    ...t,
    ...processor(p, points, v, coordinate, options, labels),
  };
}

/**
 * Render normal label for each mark.
 * @todo Support position option: middle...
 */
export const Label: SC<LabelOptions> = (options, context) => {
  const { coordinate, theme } = context;
  const { render } = options;
  return (points, value, style, labels) => {
    const {
      text,
      x,
      y,
      transform: specifiedTS = '',
      transformOrigin,
      className = '',
      ...overrideStyle
    } = value;
    const {
      rotate = 0,
      transform = '',
      ...defaultStyle
    } = getDefaultStyle(points, value, coordinate, theme, options, labels);

    return select(new Advance())
      .call(applyStyle, defaultStyle)
      .style('text', `${text}`)
      .style('className', `${className} g2-label`)
      .style(
        'innerHTML',
        render ? render(text, value.datum, value.index) : undefined,
      )
      .style(
        'labelTransform',
        `${transform} rotate(${+rotate}) ${specifiedTS}`.trim(),
      )
      .style('labelTransformOrigin', transformOrigin)
      .style('coordCenter', coordinate.getCenter())
      .call(applyStyle, overrideStyle)
      .node();
  };
};

Label.props = {
  defaultMarker: 'point',
};
