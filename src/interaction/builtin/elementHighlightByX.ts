import { ElementHighlightByXInteraction } from '../../spec';
import { createInteraction } from '../create';

export type ElementHighlightByXOptions = Omit<
  ElementHighlightByXInteraction,
  'type'
>;

export const InteractionDescriptor = (
  options?: ElementHighlightByXOptions,
) => ({
  start: [
    {
      trigger: 'plot:pointermove',
      action: [
        { type: 'elementSelection', filterBy: 'x' },
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

export const ElementHighlightByX =
  createInteraction<ElementHighlightByXOptions>(InteractionDescriptor);

ElementHighlightByX.props = {};
