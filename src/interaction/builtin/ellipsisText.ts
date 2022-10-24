// @ts-nocheck
import { EllipsisTextInteraction } from '../../spec';
import { createInteraction } from '../create';

export type EllipsisTextOptions = Omit<EllipsisTextInteraction, 'type'>;

export const InteractionDescriptor = (options?: EllipsisTextOptions) => ({
  start: [
    {
      trigger: 'mousemove',
      throttle: { wait: 50, leading: true, trailing: false },
      action: [
        { type: 'surfacePointSelection' },
        { type: 'recordTip' },
        { type: 'poptip', ...options },
      ],
    },
  ],
});

export const EllipsisText = createInteraction<EllipsisTextOptions>(
  InteractionDescriptor,
);

EllipsisText.props = {};
