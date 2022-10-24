// @ts-nocheck
import { BrushHighlightInteraction } from '../../spec';
import { createInteraction } from '../create';

export type BrushHighlightOptions = Omit<BrushHighlightInteraction, 'type'>;

function isMask(context) {
  const { event } = context;
  const { target } = event;
  return target && target.className?.includes('mask');
}

function isHandle(context) {
  const { event } = context;
  const { target } = event;
  return target && target.className?.includes('handle');
}

function isInPlot(context) {
  return !isMask(context) && !isHandle(context);
}

function dragEnable(context) {
  return isMask(context) || isHandle(context);
}

export const InteractionDescriptor = (options?: BrushHighlightOptions) => {
  const { brushType, multiple } = options;
  const maskPrefix = brushType === 'polygon' ? 'polygon' : 'rect';
  const dim = brushType === 'rectX' ? 'x' : brushType === 'rectY' ? 'y' : '';
  return {
    start: [
      {
        trigger: 'plot:pointermove',
        isEnable: (context) => isInPlot(context),
        action: [{ type: 'cursor', cursor: 'crosshair' }],
      },
      {
        trigger: 'plot:pointermove',
        isEnable: (context) => !isInPlot(context),
        action: [{ type: 'cursor' }],
      },
      {
        trigger: 'plot:pointerdown',
        isEnable: (context) => isInPlot(context),
        action: [
          multiple ? null : { type: 'recordPoint', clear: true },
          { type: 'recordPoint', start: true },
          { type: 'recordRegion', dim },
          { type: 'recordState', state: 'brushing' },
        ].filter((a) => !!a),
      },
      {
        trigger: 'plot:pointermove',
        isEnable: (context) =>
          context.shared.currentState === 'brushing' && !isMask(context),
        action: [
          { type: 'recordPoint' },
          { type: 'recordRegion', dim },
          { type: 'mask', maskType: brushType },
        ],
      },
      {
        trigger: 'plot:maskChange',
        action: [
          { type: 'elementSelection', trigger: `${maskPrefix}-mask` },
          { type: 'highlightElement' },
        ],
      },
      {
        trigger: 'plot:pointerup',
        isEnable: (context) => context.shared.currentState === 'brushing',
        action: [{ type: 'recordState', state: null }],
      },
      // Drag mask.
      {
        trigger: 'plot:dragstart',
        isEnable: (context) => dragEnable(context),
        action: [{ type: 'recordCurrentPoint' }],
      },
      {
        trigger: 'plot:drag',
        isEnable: (context) =>
          dragEnable(context) && context.shared.currentPoint,
        action: [
          { type: 'move' },
          { type: 'recordRegion', dim },
          { type: 'mask', maskType: brushType },
          { type: 'recordCurrentPoint' },
        ],
      },
      {
        trigger: 'plot:dragend',
        isEnable: (context) => dragEnable(context),
        action: [{ type: 'recordCurrentPoint', clear: true }],
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
        isEnable: (context) => context.event.detail === 2 && !isMask(context),
        action: [
          { type: 'recordPoint', clear: true },
          { type: 'recordRegion' },
          { type: 'mask' },
          { type: 'elementSelection', trigger: `${maskPrefix}-mask` },
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
