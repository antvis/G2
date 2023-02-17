import { MarkComponent as MC } from '../runtime';
import { RangeYMark } from '../spec';
import {
  baseAnnotationChannels,
  basePostInference,
  basePreInference,
} from './utils';
import { AbstractRange } from './range';

export type RangeYOptions = Omit<RangeYMark, 'type'>;

export const RangeY: MC<RangeYOptions> = () => {
  return AbstractRange({ extendX: true });
};

const shapes = ['range'];

RangeY.props = {
  defaultShape: 'range',
  defaultLabelShape: 'label',
  composite: false,
  channels: [
    ...baseAnnotationChannels({ shapes }),
    { name: 'y', required: true },
  ],
  preInference: [...basePreInference()],
  postInference: [...basePostInference()],
};
