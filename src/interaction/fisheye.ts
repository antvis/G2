import { InteractionComponent as IC } from '../runtime';
import { FisheyeInteraction } from '../spec';

export type FisheyeOptions = Omit<FisheyeInteraction, 'type'>;

export const Fisheye: IC<FisheyeOptions> = (options) => ({
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

Fisheye.props = {};
