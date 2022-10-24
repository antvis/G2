// @ts-nocheck
import { ElementSelectedInteraction } from '../../spec';
import { createInteraction } from '../create';

export type ElementSelectedOptions = Omit<ElementSelectedInteraction, 'type'>;

export const InteractionDescriptor = (options: ElementSelectedOptions = {}) => {
  const { singleMode = false } = options;
  return {
    start: [
      {
        trigger: 'plot:pointerdown',
        action: [
          { type: 'elementSelection', multiple: !singleMode, toggle: true },
          { type: 'activeElement', border: 2, ...options },
        ],
      },
    ],
  };
};

export const ElementSelected = createInteraction<ElementSelectedOptions>(
  InteractionDescriptor,
);

ElementSelected.props = {};
