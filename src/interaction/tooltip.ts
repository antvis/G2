import { InteractionComponent as IC } from '../runtime';
import { TooltipInteraction } from '../spec';

export type TooltipOptions = Omit<TooltipInteraction, 'type'>;

export const Tooltip: IC<TooltipOptions> = (options) => ({
  interactors: [{ type: 'mousePosition' }, { type: 'touchPosition' }],
  start: [
    {
      trigger: 'hover',
      action: [
        { type: 'surfacePointSelection' },
        { type: 'tooltip', ...options },
      ],
      throttle: { wait: 50, leading: true, trailing: false },
    },
    {
      trigger: 'leave',
      action: [
        { type: 'surfacePointSelection' },
        { type: 'tooltip', ...options },
      ],
    },
  ],
});

Tooltip.props = {};
