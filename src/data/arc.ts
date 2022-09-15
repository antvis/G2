import { DataComponent as DC } from '../runtime';
import { ArcTransform } from '../spec';
import { Arc as ArcLayout } from '../data/utils/arc';

export type ArcOptions = Omit<ArcTransform, 'type'>;

/**
 * For arc diagram(edge with weight) or chord diagram(with weight)
 */
export const Arc: DC<ArcOptions> = (options) => {
  return (data) => {
    return ArcLayout(options)(data);
  };
};

Arc.props = {};
