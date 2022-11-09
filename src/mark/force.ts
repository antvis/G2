import { CompositionComponent as CC } from '../runtime';
import { ForceMark } from '../spec';

export type ForceOptions = Omit<ForceMark, 'type'>;

export const Force: CC<ForceOptions> = (options) => {
  return (viewOptions) => {
    return [];
  };
};

Force.props = { composite: true };
