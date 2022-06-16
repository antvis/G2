import { TransformComponent as TC } from '../../runtime';
import { ArcTransform } from '../../spec';
import { merge } from '../utils/helper';
import { Arc as ArcLayout } from '../utils/arc';

export type ArcOptions = Omit<ArcTransform, 'type'>;

/**
 * For arc diagram(edge with weight) or chord diagram(with weight)
 */
export const Arc: TC<ArcOptions> = (options) => {
  return merge(({ data }) => {
    return {
      data: ArcLayout(options)(data),
    };
  });
};

Arc.props = {
  category: 'preprocessor',
};
