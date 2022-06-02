import { MarkComponent as MC } from '../../runtime';
import { AnnotationRangeX } from '../../spec';
import {
  baseAnnotationChannels,
  basePostInference,
  basePreInference,
} from '../utils';
import { Range } from './range';

export type RangeXOptions = Omit<AnnotationRangeX, 'type'>;

export const RangeX: MC<RangeXOptions> = () => {
  return Range();
};

RangeX.props = {
  defaultShape: 'annotation.range',
  channels: [...baseAnnotationChannels(), { name: 'x', required: true }],
  preInference: [...basePreInference()],
  postInference: [...basePostInference()],
  shapes: ['annotation.range'],
};
