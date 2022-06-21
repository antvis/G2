import { LegendActiveInteraction } from '../../spec';
import { createInteraction } from '../create';

export type LegendActiveOptions = Omit<LegendActiveInteraction, 'type'>;

export const InteractionDescriptor = (options?: LegendActiveOptions) => ({
  start: [
    {
      trigger: 'legend-item:pointermove',
      action: [
        { type: 'triggerInfoSelection' },
        { type: 'legendItemSelection', from: 'triggerInfo' },
        { type: 'setItemState', items: 'legendItem', state: 'active' },
        { type: 'elementSelection', from: 'triggerInfo' },
        { type: 'highlightSelection' },
      ],
    },
  ],
  end: [
    {
      trigger: 'legend-item:pointerleave',
      action: [
        { type: 'triggerInfoSelection' },
        { type: 'legendItemSelection', from: 'triggerInfo' },
        { type: 'setItemState', items: 'legendItem', state: 'active' },
        { type: 'elementSelection', from: 'triggerInfo' },
        { type: 'highlightSelection' },
      ],
    },
  ],
});

export const LegendActive = createInteraction<LegendActiveOptions>(
  InteractionDescriptor,
);

LegendActive.props = {};
