import { LegendActiveInteraction } from '../../spec';
import { createInteraction } from '../create';

export type LegendActiveOptions = Omit<LegendActiveInteraction, 'type'>;

export const InteractionDescriptor = (options?: LegendActiveOptions) => ({
  start: [
    {
      trigger: 'legend-item:pointermove',
      action: [
        { type: 'triggerInfoSelection' },
        { type: 'legendItemSelection', trigger: 'triggerInfo' },
        { type: 'setItemState', items: 'legendItem', state: 'active' },
        { type: 'elementSelection', trigger: 'triggerInfo' },
        { type: 'activeElement' },
      ],
    },
  ],
  end: [
    {
      trigger: 'legend-item:pointerleave',
      action: [
        { type: 'triggerInfoSelection' },
        { type: 'legendItemSelection', trigger: 'triggerInfo' },
        { type: 'setItemState', items: 'legendItem', state: 'active' },
        { type: 'elementSelection', trigger: 'triggerInfo' },
        { type: 'activeElement' },
      ],
    },
  ],
});

export const LegendActive = createInteraction<LegendActiveOptions>(
  InteractionDescriptor,
);

LegendActive.props = {};
