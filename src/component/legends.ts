import { Group } from '@antv/g';

import type { GuideComponentComponent as GCC } from '../runtime';

export type LegendsOptions = Record<string, unknown>;

// A empty component to pass parse view tree stage.
export const Legends: GCC<LegendsOptions> = (options) => {
  return () => {
    return new Group();
  };
};

Legends.props = {};
