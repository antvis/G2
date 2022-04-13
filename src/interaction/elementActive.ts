import { InteractionComponent as IC } from '../runtime';
import { ElementActiveInteraction } from '../spec';

export type ElementActiveOptions = Omit<ElementActiveInteraction, 'type'>;

export const ElementActive: IC<ElementActiveOptions> = (options) => ({
  interactors: [{ type: 'mousePosition' }, { type: 'touchPosition' }],
  start: [
    {
      trigger: 'hover',
      action: [
        { type: 'surfacePointSelection' },
        { type: 'highlightSelection', ...options },
      ],
    },
  ],
  end: [
    {
      trigger: 'leave',
      action: [
        { type: 'surfacePointSelection' },
        { type: 'highlightSelection', ...options },
      ],
    },
  ],
});

ElementActive.props = {};
