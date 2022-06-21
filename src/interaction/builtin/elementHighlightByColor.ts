import { ElementHighlightByColorInteraction } from '../../spec';
import { createInteraction } from '../create';

export type ElementHighlightByColorOptions = Omit<
  ElementHighlightByColorInteraction,
  'type'
>;

export const InteractionDescriptor = (
  options?: ElementHighlightByColorOptions,
) => ({
  start: [
    {
      trigger: 'plot:pointermove',
      action: [
        { type: 'elementSelection', filterBy: 'color' },
        { type: 'highlight', ...options },
      ],
    },
  ],
  end: [
    {
      trigger: 'plot:pointerleave',
      action: [{ type: 'elementSelection' }, { type: 'highlight', ...options }],
    },
  ],
});

export const ElementHighlightByColor =
  createInteraction<ElementHighlightByColorOptions>(InteractionDescriptor);

ElementHighlightByColor.props = {};
