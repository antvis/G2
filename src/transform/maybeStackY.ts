import { TransformComponent as TC, TransformSpec } from '../runtime';
import { StackY } from './stackY';

export type MaybeStackYOptions = {
  series?: boolean;
};

// Avoid duplicate stackY.
// In most of case only one of stackY and dodgeX is needed.
// So pass statistic with stackY and dodgeX.
function exclude(transform: TransformSpec): boolean {
  const { type } = transform;
  const excludes = ['stackY', 'dodgeX', 'groupX'];
  return typeof type === 'string' && excludes.includes(type);
}

/**
 * Add zero constant encode for x channel.
 * This is useful for interval geometry.
 */
export const MaybeStackY: TC<MaybeStackYOptions> = (options) => {
  return (I, mark, context) => {
    // Skip some transform.
    const { encode, transform = [] } = mark;
    if (transform.some(exclude)) return [I, mark];

    // StackY need both x and y channel values.
    const { x, y } = encode;
    if (x === undefined || y === undefined) return [I, mark];

    const { series } = options;
    const groupBy = series ? ['x', 'series'] : 'x';
    return StackY({ groupBy })(I, mark, context);
  };
};

MaybeStackY.props = {};
