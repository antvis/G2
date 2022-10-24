// @ts-nocheck
import { ElementListHighlightInteraction } from '../../spec';
import { createInteraction } from '../create';

export type ElementListHighlightOptions = Omit<
  ElementListHighlightInteraction,
  'type'
>;

export const InteractionDescriptor = (
  options?: ElementListHighlightOptions,
) => ({
  start: [
    {
      trigger: 'plot:pointermove',
      action: [
        { type: 'elementSelection' },
        { type: 'highlightElement', ...options },
        { type: 'legendItemSelection', from: 'selectedElements' },
        { type: 'setItemState', items: ['legendItem'], state: 'highlight' },
      ],
    },
  ],
  end: [
    {
      trigger: 'plot:pointerleave',
      action: [
        { type: 'elementSelection' },
        { type: 'highlightElement', ...options },
        { type: 'legendItemSelection', from: 'selectedElements' },
        { type: 'setItemState', items: ['legendItem'], state: 'highlight' },
      ],
    },
  ],
});

export const ElementListHighlight =
  createInteraction<ElementListHighlightOptions>(InteractionDescriptor);

ElementListHighlight.props = {};
