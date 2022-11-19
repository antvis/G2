// @ts-nocheck
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
        { type: 'elementSelection', filter: 'x' },
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

export const ElementHighlightByX =
  createInteraction<ElementHighlightByXOptions>(InteractionDescriptor);

ElementHighlightByX.props = {};
