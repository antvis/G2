import { InteractionComponent as IC } from '../runtime';
import { LegendActiveInteraction } from '../spec';

export type LegendActiveOptions = Omit<LegendActiveInteraction, 'type'>;

export const LegendActive: IC<LegendActiveOptions> = (options) => ({
  start: [
    {
      trigger: 'legend-item:pointermove',
      action: [
        { type: 'legendSelection' },
        { type: 'highlightLegendSelection' },
        { type: 'highlightSelection', ...options },
      ],
    },
  ],
  end: [
    {
      trigger: 'legend-item:pointerleave',
      action: [
        { type: 'legendSelection' },
        { type: 'highlightLegendSelection' },
        { type: 'highlightSelection', ...options },
      ],
    },
  ],
});

LegendActive.props = {};
