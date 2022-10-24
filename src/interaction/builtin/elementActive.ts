// @ts-nocheck
import { ElementActiveInteraction } from '../../spec';
import { createInteraction } from '../create';

export type ElementActiveOptions = Omit<ElementActiveInteraction, 'type'>;

export const InteractionDescriptor = (options?: ElementActiveOptions) => ({
  interactors: [{ type: 'mousePosition' }, { type: 'touchPosition' }],
  start: [
    {
      trigger: 'hover',
      action: [
        { type: 'elementSelection' },
        { type: 'activeElement', ...options },
      ],
    },
  ],
  end: [
    {
      trigger: 'leave',
      action: [
        { type: 'elementSelection' },
        { type: 'activeElement', ...options },
      ],
    },
  ],
});

export const ElementActive = createInteraction<ElementActiveOptions>(
  InteractionDescriptor,
);

ElementActive.props = {};
