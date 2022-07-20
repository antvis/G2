import { BrushVisibleInteraction } from '../../spec';
import { createInteraction } from '../create';

export type BrushVisibleOptions = Omit<BrushVisibleInteraction, 'type'>;

export const InteractionDescriptor = (options?: BrushVisibleOptions) => {
  const { brushType } = options;
  const maskPrefix = brushType === 'polygon' ? 'polygon' : 'rect';
  const dim = brushType === 'rectX' ? 'x' : brushType === 'rectY' ? 'y' : '';
  return {
    start: [
      {
        trigger: 'plot:pointerenter',
        action: [{ type: 'cursor', cursor: 'crosshair' }],
      },
      {
        trigger: 'plot:pointerdown',
        action: [
          { type: 'recordPoint', clear: true },
          { type: 'recordPoint', start: true },
          { type: 'recordRegion', dim },
          { type: 'recordState', state: 'brushing' },
        ],
      },
      {
        trigger: 'plot:pointermove',
        isEnable: (context) => context.shared.currentState === 'brushing',
        action: [
          { type: 'recordPoint' },
          { type: 'recordRegion', dim },
          { type: 'mask', maskType: brushType },
        ],
      },
      {
        trigger: 'plot:maskChange',
        action: [
          { type: 'elementSelection', from: `${maskPrefix}-mask` },
          { type: 'highlightElement' },
        ],
      },
      {
        trigger: 'plot:pointerup',
        action: [
          { type: 'recordState', state: null },
          { type: 'elementSelection', from: `${maskPrefix}-mask` },
          { type: 'filterElement' },
          // Clear highlight elements, but not to effect elements of mainLayer.
          { type: 'highlightElement', clear: true },
          // Clear mask
          { type: 'recordPoint', clear: true },
          { type: 'recordRegion' },
          { type: 'mask' },
        ],
      },
    ],
    end: [
      {
        trigger: 'plot:pointerleave',
        action: [{ type: 'cursor', cursor: 'default' }],
      },
    ],
  };
};

export const BrushVisible = createInteraction<BrushVisibleOptions>(
  InteractionDescriptor,
);

BrushVisible.props = {};
