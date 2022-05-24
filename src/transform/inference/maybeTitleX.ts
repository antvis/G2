import { TransformComponent as TC } from '../../runtime';
import { merge, column } from '../utils/helper';

export type MaybeTitleXOptions = Record<string, never>;

/**
 * Add zero constant encode for x channel.
 * This is useful for interval geometry.
 */
export const MaybeTitleX: TC<MaybeTitleXOptions> = () => {
  return merge(({ encode, columnOf, data }) => {
    const { x, title } = encode;
    if (title !== undefined) return {};
    const X = columnOf(data, x);
    return {
      encode: {
        x: column(X),
        title: column(X),
      },
    };
  });
};

MaybeTitleX.props = {
  type: 'inference',
};
