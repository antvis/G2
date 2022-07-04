import { MarkComponent as MC } from '../../runtime';
import { AnnotationRangeY } from '../../spec';
import {
  baseAnnotationChannels,
  basePostInference,
  basePreInference,
} from '../utils';
import { AbstractRange } from './range';

export type RangeYOptions = Omit<AnnotationRangeY, 'type'>;

export const RangeY: MC<RangeYOptions> = () => {
  return AbstractRange({ extendX: true });
};

RangeY.props = {
  defaultShape: 'annotation.range',
  defaultLabelShape: 'label',
  channels: [...baseAnnotationChannels(), { name: 'y', required: true }],
  preInference: [...basePreInference()],
  postInference: [...basePostInference()],
  shapes: ['annotation.range'],
};
