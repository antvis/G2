import { InteractionComponent as IC } from '../runtime';
import { FisheyeInteraction } from '../spec';

export type FisheyeOptions = Omit<FisheyeInteraction, 'type'>;

export const Fisheye: IC<FisheyeOptions> = (options) => ({
  interactors: [{ type: 'mousePosition' }],
  start: [
    {
      trigger: 'hover',
      throttle: { wait: 50, leading: true, trailing: false },
      action: [{ type: 'fisheyeFocus', ...options }, { type: 'plot' }],
    },
  ],
  end: [
    {
      trigger: 'hover',
      action: [{ type: 'fisheyeFocus', ...options }, { type: 'plot' }],
    },
  ],
});

Fisheye.props = {};
