import { StackY } from '../statistic/stackY';
import { TransformComponent as TC } from '../../runtime';
import { merge } from '../utils/helper';

export type MaybeStackYOptions = {
  series?: boolean;
};

/**
 * Add zero constant encode for x channel.
 * This is useful for interval geometry.
 */
export const MaybeStackY: TC<MaybeStackYOptions> = (options) => {
  return merge((context) => {
    const { encode, transform } = context;
    const { x, y } = encode;
    // Avoid duplicate stackY.
    // In most of case only one of stackY and dodgeX is needed.
    // So pass statistic with stackY and dodgeX.
    if (transform.find(({ type }) => type === 'stackY' || type === 'dodgeX')) {
      return {};
    }
    // StackY need both x and y channel values, so pass value with empty x or y channel.
    if (x === undefined || y === undefined) return {};
    const { series } = options;
    const groupBy = series ? ['x', 'series'] : 'x';
    return StackY({ groupBy })(context);
  });
};

MaybeStackY.props = {
  category: 'inference',
};
