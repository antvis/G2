import { BrushHighlightInteraction } from '../../spec';
import { createInteraction } from '../create';

export type BrushHighlightOptions = Omit<BrushHighlightInteraction, 'type'>;

export const InteractionDescriptor = (options?: BrushHighlightOptions) => {
  const { brushType } = options;
  const maskType = brushType === 'polygon' ? 'polygon' : 'rect';
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
          { type: 'mask', maskType },
        ],
      },
      {
        trigger: 'plot:maskChange',
        action: [
          { type: 'elementSelection', from: `${maskType}-mask` },
          { type: 'highlightElement' },
        ],
      },
      {
        trigger: 'plot:pointerup',
        action: [{ type: 'recordState', state: null }],
      },
    ],
    end: [
      {
        trigger: 'plot:pointerleave',
        action: [{ type: 'cursor', cursor: 'default' }],
      },
      {
        trigger: 'plot:click',
        // dblclick. https://g-next.antv.vision/zh/docs/api/event
        isEnable: (context) => context.event.detail === 2,
        action: [
          { type: 'recordPoint', clear: true },
          { type: 'recordRegion' },
          { type: 'mask' },
          { type: 'elementSelection', from: `${maskType}-mask` },
          { type: 'highlightElement' },
        ],
      },
    ],
  };
};

export const BrushHighlight = createInteraction<BrushHighlightOptions>(
  InteractionDescriptor,
);

BrushHighlight.props = {};
