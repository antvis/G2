import { TransformComponent as TC } from '../../runtime';
import { merge, column } from '../utils/helper';

export type MaybeKeyOptions = {
  channel: string;
};

/**
 * Add zero constant encode for x channel.
 * This is useful for interval geometry.
 */
export const MaybeKey: TC<MaybeKeyOptions> = () => {
  return merge(({ encode, data, I, columnOf }) => {
    const { key, ...rest } = encode;
    if (key !== undefined) return {};
    const values = Object.values(rest).map((d) => columnOf(data, d));
    const K = I.map((i) =>
      values
        .filter((V) => V !== null)
        .map((V) => V[i])
        .join('-'),
    );
    return { encode: { key: column(K) } };
  });
};

MaybeKey.props = {
  type: 'inference',
};
