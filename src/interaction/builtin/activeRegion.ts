import { ActiveRegionInteraction } from '../../spec';
import { createInteraction } from '../create';

export type ActiveRegionOptions = Omit<ActiveRegionInteraction, 'type'>;

export const InteractionDescriptor = (options: ActiveRegionOptions = {}) => {
  return {
    start: [
      {
        trigger: 'plot:mousemove',
        action: [{ type: 'activeRegion', ...options }],
      },
      {
        trigger: 'plot:mouseleave',
        action: [{ type: 'activeRegion', clear: true }],
      },
    ],
  };
};

export const ActiveRegion = createInteraction<ActiveRegionOptions>(
  InteractionDescriptor,
);

ActiveRegion.props = {};
