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

RangeY.props = {
  defaultShape: 'range',
  defaultLabelShape: 'label',
  channels: [...baseAnnotationChannels(), { name: 'y', required: true }],
  preInference: [...basePreInference()],
  postInference: [...basePostInference()],
  shapes: ['range'],
};
