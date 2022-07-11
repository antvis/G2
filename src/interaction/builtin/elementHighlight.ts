import { ElementHighlightInteraction } from '../../spec';
import { createInteraction } from '../create';

export type ElementHighlightOptions = Omit<ElementHighlightInteraction, 'type'>;

export const InteractionDescriptor = (options?: ElementHighlightOptions) => ({
  start: [
    {
      trigger: 'plot:pointermove',
      action: [
        { type: 'elementSelection' },
        { type: 'highlightElement', ...options },
      ],
    },
  ],
  end: [
    {
      trigger: 'plot:pointerleave',
      action: [
        { type: 'elementSelection' },
        { type: 'highlightElement', ...options },
      ],
    },
  ],
});

export const ElementHighlight = createInteraction<ElementHighlightOptions>(
  InteractionDescriptor,
);

ElementHighlight.props = {};
