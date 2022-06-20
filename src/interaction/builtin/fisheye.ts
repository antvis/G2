import { FisheyeInteraction } from '../../spec';
import { createInteraction } from '../create';

export type FisheyeOptions = Omit<FisheyeInteraction, 'type'>;

export const InteractionDescriptor = (options?: FisheyeOptions) => ({
  interactors: [{ type: 'mousePosition' }, { type: 'touchPosition' }],
  start: [
    {
      trigger: 'hover',
      throttle: { wait: 50, leading: true, trailing: false },
      action: [{ type: 'fisheyeFocus', ...options }, { type: 'plot' }],
    },
  ],
  end: [
    {
      trigger: 'leave',
      action: [{ type: 'fisheyeFocus', ...options }, { type: 'plot' }],
    },
  ],
});

export const Fisheye = createInteraction<FisheyeOptions>(InteractionDescriptor);

Fisheye.props = {};
