import { Mark, MarkComponent as MC, Vector2 } from '../runtime';
import { ShapeMark } from '../spec';
import { ShapeShape } from '../shape';
import {
  MaybeTuple,
  MaybeVisualPosition,
  MaybeFunctionAttribute,
} from '../transform';
import { basePreInference, createBandOffset, visualMark } from './utils';

const shape = {
  shape: ShapeShape,
};

export type ShapeOptions = Omit<ShapeMark, 'type'>;

/**
 * @todo Unify with text, image and point.
 */
export const Shape: MC<ShapeOptions> = (options) => {
  const { cartesian } = options;
  if (cartesian) return visualMark as Mark;
  return (index, scale, value, coordinate) => {
    const { x: X, y: Y } = value;
    const offset = createBandOffset(scale, value, options);
    const P = Array.from(index, (i) => {
      const p: Vector2 = [+X[i], +Y[i]];
      return [coordinate.map(offset(p, i))] as Vector2[];
    });
    return [index, P];
  };
};

Shape.props = {
  defaultShape: 'shape',
  defaultLabelShape: 'label',
  composite: false,
  shape,
  channels: [
    { name: 'x', required: true },
    { name: 'y', required: true },
  ],
  preInference: [
    ...basePreInference(),
    { type: MaybeTuple },
    { type: MaybeVisualPosition },
    { type: MaybeFunctionAttribute },
  ],
};
