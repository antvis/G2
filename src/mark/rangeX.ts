import { MarkComponent as MC } from '../runtime';
import { RangeXMark } from '../spec';
import {
  baseAnnotationChannels,
  basePostInference,
  basePreInference,
} from './utils';
import { AbstractRange } from './range';

export type RangeXOptions = Omit<RangeXMark, 'type'>;

export const RangeX: MC<RangeXOptions> = () => {
  return AbstractRange({ extendY: true });
};

const shapes = ['range'];

RangeX.props = {
  defaultShape: 'range',
  defaultLabelShape: 'label',
  composite: false,
  channels: [
    ...baseAnnotationChannels({ shapes }),
    { name: 'x', required: true },
  ],
  preInference: [...basePreInference()],
  postInference: [...basePostInference()],
};
