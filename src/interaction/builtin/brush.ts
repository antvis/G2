import { BrushInteraction } from '../../spec';
import { createInteraction } from '../create';

export type BrushOptions = Omit<BrushInteraction, 'type'>;

function isButton(context) {
  const { event } = context;
  const { target } = event;
  return target && target.className?.includes('button');
}

export const InteractionDescriptor = (options?: BrushOptions) => {
  const { brushType } = options;
  const maskPrefix = brushType === 'polygon' ? 'polygon' : 'rect';
  const dim = brushType === 'rectX' ? 'x' : brushType === 'rectY' ? 'y' : '';
  return {
    start: [
      {
        trigger: 'plot:pointermove',
        isEnable: (context) => !isButton(context),
        action: [{ type: 'cursor', cursor: 'crosshair' }],
      },
      {
        trigger: 'plot:pointermove',
        isEnable: (context) => isButton(context),
        action: [{ type: 'cursor', cursor: 'pointer' }, { type: 'button' }],
      },
      {
        trigger: 'plot:pointermove',
        isEnable: (context) =>
          context.shared.currentState === 'filtered' && !isButton(context),
        action: [{ type: 'button', fill: '#f7f7f7' }],
      },
      {
        trigger: 'plot:pointerdown',
        isEnable: (context) => !isButton(context),
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
        isEnable: (context) => !isButton(context),
        action: [
          { type: 'recordState', state: null },
          { type: 'elementSelection', from: `${maskPrefix}-mask` },
          { type: 'filter' },
          { type: 'plot' },
          { type: 'recordState', state: 'filtered' },
          { type: 'recordPoint', clear: true },
          { type: 'recordRegion' },
          { type: 'mask' },
          { type: 'elementSelection', from: `${maskPrefix}-mask` },
          { type: 'highlightElement' },
          { type: 'button' },
        ],
      },
      {
        trigger: 'plot:click',
        isEnable: (context) => isButton(context),
        action: [
          { type: 'button', hide: true },
          { type: 'filter', reset: true },
          { type: 'plot' },
          { type: 'recordState', state: null },
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

export const Brush = createInteraction<BrushOptions>(InteractionDescriptor);

Brush.props = {};
