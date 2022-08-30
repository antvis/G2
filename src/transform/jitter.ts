import { Band } from '@antv/scale';
import { deepMix } from '@antv/util';
import { Primitive, TransformComponent as TC } from '../runtime';
import { JitterTransform } from '../spec';
import { random } from '../utils/helper';
import { column, columnOf } from './utils/helper';
import { domainOf } from './utils/order';

export type JitterOptions = Omit<JitterTransform, 'type'>;

export function rangeOf(
  value: Primitive[],
  scaleOptions: Record<string, any>,
  padding: number,
): [number, number] {
  if (value === null) return [-0.5, 0.5];
  const domain = domainOf(value, scaleOptions);
  const scale = new Band({ domain, range: [0, 1], padding });
  const step = scale.getBandWidth();
  return [-step / 2, step / 2];
}

/**
 * The jitter transform produce dx and dy channels for marks (especially for point)
 * with ordinal x and y dimension, say to make them jitter in their own space.
 */
export const Jitter: TC<JitterOptions> = (options = {}) => {
  const { paddingX = 0, paddingY = 0 } = options;
  return (I, mark) => {
    const { encode, scale } = mark;
    const { x: scaleX, y: scaleY } = scale;
    const [X] = columnOf(encode, 'x');
    const [Y] = columnOf(encode, 'y');
    const rangeX = rangeOf(X, scaleX, paddingX);
    const rangeY = rangeOf(Y, scaleY, paddingY);
    const DY = I.map(() => random(...rangeY));
    const DX = I.map(() => random(...rangeX));
    return [
      I,
      deepMix({}, mark, { encode: { dy: column(DY), dx: column(DX) } }),
    ];
  };
};

Jitter.props = {};
